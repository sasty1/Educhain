// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title PrivateSchoolEligibility - Enhanced Version
 * @notice Checks student eligibility with stricter criteria and anti-gaming mechanisms
 * @dev Makes it significantly harder to achieve passing scores
 */
contract PrivateSchoolEligibility {
    // Point system thresholds - MUCH STRICTER
    uint16 public constant PASSING_SCORE = 70; // Need 70/100 to pass
    uint16 public constant EXCELLENCE_BONUS_THRESHOLD = 85; // Bonus if you're exceptional

    // Point allocations - REDISTRIBUTED
    uint8 public constant AGE_POINTS = 15;
    uint8 public constant EXAM_POINTS = 35;
    uint8 public constant INCOME_POINTS = 15;
    uint8 public constant EXTRACURRICULAR_POINTS = 15;
    uint8 public constant INTERVIEW_POINTS = 15;
    uint8 public constant CONSISTENCY_BONUS = 10; // New: reward for consistent data
    uint8 public constant PENALTY_CAP = 25; // Maximum penalty deduction

    // Stricter eligibility criteria
    uint8 public constant MIN_AGE = 10; // Raised from 5
    uint8 public constant MAX_AGE = 22; // Lowered from 65 - traditional school age only
    uint8 public constant MIN_EXAM_SCORE = 70; // Raised from 60
    uint8 public constant IDEAL_AGE_MIN = 14;
    uint8 public constant IDEAL_AGE_MAX = 18;

    address public admin;
    uint256 public totalApplications;
    uint256 public approvedApplications;

    // Store student data
    struct StudentData {
        string fullName;
        string email;
        uint8 age;
        uint8 regionCode;
        uint8 incomeBracket;
        uint16 examScore;
        uint8 extracurricularScore; // 0-10
        uint8 interviewScore; // 0-10
        uint16 totalPoints; // Out of 100
        uint16 penaltyPoints; // Points deducted
        bool isEligible;
        bool hasSubmitted;
        uint256 submissionTime;
        bytes32 dataHash; // Hash of submitted data for verification
    }

    mapping(address => StudentData) private studentData;
    mapping(address => bool) private hasEverSubmitted; // Prevent resubmission
    mapping(bytes32 => bool) private usedDataHashes; // Prevent duplicate data

    event DataSubmitted(address indexed student, uint16 totalPoints, bool isEligible);
    event EligibilityComputed(address indexed student, uint16 points, uint16 penalties);
    event SuspiciousActivity(address indexed student, string reason);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    modifier notSubmittedBefore() {
        require(!hasEverSubmitted[msg.sender], "Already submitted application");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
    }

    /**
     * @notice Submit student application - ONE TIME ONLY
     * @dev Stricter validation and anti-gaming measures
     */
    function submitApplication(
        string memory _fullName,
        string memory _email,
        uint8 _age,
        uint8 _regionCode,
        uint8 _incomeBracket,
        uint16 _examScore,
        uint8 _extracurricularScore,
        uint8 _interviewScore
    ) external notSubmittedBefore {
        // Basic validation - STRICTER
        require(_age >= MIN_AGE && _age <= MAX_AGE, "Age must be 10-22");
        require(_examScore >= MIN_EXAM_SCORE && _examScore <= 100, "Exam score must be 70-100");
        require(_extracurricularScore <= 10, "Invalid extracurricular score");
        require(_interviewScore <= 10, "Invalid interview score");
        require(_incomeBracket >= 1 && _incomeBracket <= 5, "Income bracket must be 1-5");
        require(_regionCode >= 1 && _regionCode <= 10, "Region code must be 1-10");
        require(bytes(_fullName).length >= 3, "Name must be at least 3 characters");
        require(bytes(_email).length >= 5, "Email must be at least 5 characters");
        require(_containsAtSymbol(_email), "Email must contain @");

        // Create data hash to prevent duplicate submissions
        bytes32 dataHash = keccak256(abi.encodePacked(
            _fullName, _email, _age, _regionCode, _incomeBracket, _examScore
        ));
        require(!usedDataHashes[dataHash], "This exact data has been submitted before");

        // Store data
        studentData[msg.sender].fullName = _fullName;
        studentData[msg.sender].email = _email;
        studentData[msg.sender].age = _age;
        studentData[msg.sender].regionCode = _regionCode;
        studentData[msg.sender].incomeBracket = _incomeBracket;
        studentData[msg.sender].examScore = _examScore;
        studentData[msg.sender].extracurricularScore = _extracurricularScore;
        studentData[msg.sender].interviewScore = _interviewScore;
        studentData[msg.sender].hasSubmitted = true;
        studentData[msg.sender].submissionTime = block.timestamp;
        studentData[msg.sender].dataHash = dataHash;

        hasEverSubmitted[msg.sender] = true;
        usedDataHashes[dataHash] = true;
        totalApplications++;

        _computeEligibility(msg.sender);

        emit DataSubmitted(msg.sender, studentData[msg.sender].totalPoints, studentData[msg.sender].isEligible);
    }

    /**
     * @notice Compute eligibility with STRICT scoring and penalties
     * @dev Multiple penalty mechanisms make it very hard to game
     */
    function _computeEligibility(address student) private {
        StudentData storage data = studentData[student];
        uint16 points = 0;
        uint16 penalties = 0;

        // 1. AGE POINTS (15 max) - VERY STRICT
        if (data.age >= IDEAL_AGE_MIN && data.age <= IDEAL_AGE_MAX) {
            // Perfect age range: 14-18
            points += AGE_POINTS;
        } else if (data.age >= 12 && data.age <= 13) {
            // Slightly young
            points += (AGE_POINTS * 2) / 3; // 10 points
        } else if (data.age >= 19 && data.age <= 20) {
            // Slightly old
            points += (AGE_POINTS * 2) / 3; // 10 points
        } else if (data.age >= MIN_AGE && data.age < 12) {
            // Too young
            points += AGE_POINTS / 3; // 5 points
        } else if (data.age >= 21 && data.age <= MAX_AGE) {
            // Too old
            points += AGE_POINTS / 3; // 5 points
        }

        // 2. EXAM SCORE POINTS (35 max) - EXPONENTIAL SCALING
        if (data.examScore >= 95) {
            points += EXAM_POINTS; // 35 points
        } else if (data.examScore >= 90) {
            points += (EXAM_POINTS * 4) / 5; // 28 points
        } else if (data.examScore >= 85) {
            points += (EXAM_POINTS * 3) / 5; // 21 points
        } else if (data.examScore >= 80) {
            points += (EXAM_POINTS * 2) / 5; // 14 points
        } else if (data.examScore >= 75) {
            points += EXAM_POINTS / 5; // 7 points
        } else {
            // 70-74: minimal points
            points += EXAM_POINTS / 10; // 3.5 points
        }

        // 3. INCOME POINTS (15 max) - INVERTED (lower income = more points)
        if (data.incomeBracket == 1) {
            points += INCOME_POINTS; // 15 points
        } else if (data.incomeBracket == 2) {
            points += (INCOME_POINTS * 2) / 3; // 10 points
        } else if (data.incomeBracket == 3) {
            points += INCOME_POINTS / 3; // 5 points
        } else if (data.incomeBracket == 4) {
            points += INCOME_POINTS / 6; // 2.5 points
        }
        // Bracket 5 gets 0 points

        // 4. EXTRACURRICULAR POINTS (15 max) - SCALED
        // Only high scores count
        if (data.extracurricularScore >= 9) {
            points += EXTRACURRICULAR_POINTS; // 15 points
        } else if (data.extracurricularScore >= 7) {
            points += (EXTRACURRICULAR_POINTS * 2) / 3; // 10 points
        } else if (data.extracurricularScore >= 5) {
            points += EXTRACURRICULAR_POINTS / 3; // 5 points
        }
        // Below 5 gets 0 points

        // 5. INTERVIEW POINTS (15 max) - SCALED
        if (data.interviewScore >= 9) {
            points += INTERVIEW_POINTS; // 15 points
        } else if (data.interviewScore >= 7) {
            points += (INTERVIEW_POINTS * 2) / 3; // 10 points
        } else if (data.interviewScore >= 5) {
            points += INTERVIEW_POINTS / 3; // 5 points
        }
        // Below 5 gets 0 points

        // 6. CONSISTENCY BONUS (10 max) - Reward well-rounded applicants
        uint8 highScores = 0;
        if (data.age >= IDEAL_AGE_MIN && data.age <= IDEAL_AGE_MAX) highScores++;
        if (data.examScore >= 85) highScores++;
        if (data.extracurricularScore >= 7) highScores++;
        if (data.interviewScore >= 7) highScores++;
        if (data.incomeBracket <= 2) highScores++;

        if (highScores >= 4) {
            points += CONSISTENCY_BONUS; // 10 points - need 4/5 criteria strong
        } else if (highScores == 3) {
            points += CONSISTENCY_BONUS / 2; // 5 points
        }

        // 7. PENALTY SYSTEM - Detect suspicious patterns
        
        // Penalty: Perfect scores are suspicious
        if (data.examScore == 100 && data.extracurricularScore == 10 && data.interviewScore == 10) {
            penalties += 15;
            emit SuspiciousActivity(student, "All perfect scores");
        }

        // Penalty: Wallet address-based difficulty (pseudo-random)
        uint256 walletMod = uint256(keccak256(abi.encodePacked(student))) % 100;
        if (walletMod < 30) {
            // 30% of wallets get penalty
            penalties += 5;
        } else if (walletMod < 50) {
            // Another 20% get smaller penalty
            penalties += 3;
        }

        // Penalty: Suspicious age-exam correlation
        if (data.age < 14 && data.examScore > 90) {
            penalties += 8;
            emit SuspiciousActivity(student, "Age-exam mismatch");
        }

        // Penalty: High income but claiming low bracket
        if (data.incomeBracket == 1 && data.extracurricularScore >= 8) {
            // Low income families typically can't afford many extracurriculars
            penalties += 5;
            emit SuspiciousActivity(student, "Income-extracurricular mismatch");
        }

        // Penalty: Round numbers (people tend to fake with round numbers)
        if (data.examScore % 10 == 0 && data.examScore >= 80) {
            penalties += 3;
        }

        // Penalty: Submission time-based (block timestamp)
        if (block.timestamp % 7 == 0) {
            // ~14% of submissions get time penalty
            penalties += 4;
        }

        // Cap penalties
        if (penalties > PENALTY_CAP) {
            penalties = PENALTY_CAP;
        }

        // Apply penalties
        if (points > penalties) {
            points -= penalties;
        } else {
            points = 0;
        }

        data.totalPoints = points;
        data.penaltyPoints = penalties;
        data.isEligible = points >= PASSING_SCORE;

        if (data.isEligible) {
            approvedApplications++;
        }

        emit EligibilityComputed(student, points, penalties);
    }

    /**
     * @notice Helper to check if email contains @
     */
    function _containsAtSymbol(string memory str) private pure returns (bool) {
        bytes memory strBytes = bytes(str);
        for (uint i = 0; i < strBytes.length; i++) {
            if (strBytes[i] == "@") {
                return true;
            }
        }
        return false;
    }

    /**
     * @notice Get eligibility result
     */
    function getEligibilityResult(address student) external view returns (
        bool isEligible,
        uint16 totalPoints,
        uint16 penaltyPoints
    ) {
        require(studentData[student].hasSubmitted, "No data submitted");
        return (
            studentData[student].isEligible,
            studentData[student].totalPoints,
            studentData[student].penaltyPoints
        );
    }

    /**
     * @notice Get student details
     */
    function getStudentInfo(address student) external view returns (
        string memory fullName,
        uint8 age,
        uint16 examScore,
        uint16 totalPoints,
        uint16 penaltyPoints,
        bool isEligible,
        uint256 submissionTime
    ) {
        require(studentData[student].hasSubmitted, "No data submitted");
        StudentData storage data = studentData[student];
        return (
            data.fullName,
            data.age,
            data.examScore,
            data.totalPoints,
            data.penaltyPoints,
            data.isEligible,
            data.submissionTime
        );
    }

    /**
     * @notice Get application statistics
     */
    function getStats() external view returns (
        uint256 total,
        uint256 approved,
        uint256 approvalRate
    ) {
        uint256 rate = totalApplications > 0 ? (approvedApplications * 100) / totalApplications : 0;
        return (totalApplications, approvedApplications, rate);
    }

    /**
     * @notice Check if student has submitted data
     */
    function hasSubmittedData(address student) external view returns (bool) {
        return studentData[student].hasSubmitted;
    }

    /**
     * @notice Check if address has ever submitted (prevents resubmission)
     */
    function hasEverSubmittedData(address student) external view returns (bool) {
        return hasEverSubmitted[student];
    }

    /**
     * @notice Admin functions
     */
    function updateAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

    /**
     * @notice Admin can reset a student's submission (for testing)
     */
    function resetStudent(address student) external onlyAdmin {
        hasEverSubmitted[student] = false;
        usedDataHashes[studentData[student].dataHash] = false;
        delete studentData[student];
    }
}
