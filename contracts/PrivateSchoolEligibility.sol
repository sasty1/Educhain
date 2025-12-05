// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title PrivateSchoolEligibility
 * @notice Checks student eligibility for private school admission
 * @dev Simplified version for testing without FHE
 */
contract PrivateSchoolEligibility {
    // Point system thresholds
    uint16 public constant PASSING_SCORE = 70; // Minimum points to be eligible (out of 100)
    
    // Point allocations
    uint8 public constant AGE_POINTS = 20;
    uint8 public constant EXAM_POINTS = 40;
    uint8 public constant INCOME_POINTS = 20;
    uint8 public constant EXTRACURRICULAR_POINTS = 10;
    uint8 public constant INTERVIEW_POINTS = 10;
    
    // Eligibility criteria
    uint8 public constant MIN_AGE = 5;
    uint8 public constant MAX_AGE = 65; // Support adult education
    uint8 public constant MIN_EXAM_SCORE = 60;

    address public admin;

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
        bool isEligible;
        bool hasSubmitted;
        uint256 submissionTime;
    }

    mapping(address => StudentData) private studentData;

    event DataSubmitted(address indexed student);
    event EligibilityComputed(address indexed student);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
    }

    /**
     * @notice Submit student application with all details
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
    ) external {
        require(_age >= MIN_AGE && _age <= MAX_AGE, "Invalid age");
        require(_examScore <= 100, "Invalid exam score");
        require(_extracurricularScore <= 10, "Invalid extracurricular score");
        require(_interviewScore <= 10, "Invalid interview score");
        require(bytes(_fullName).length > 0, "Name required");
        require(bytes(_email).length > 0, "Email required");

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

        _computeEligibility(msg.sender);

        emit DataSubmitted(msg.sender);
    }

    /**
     * @notice Compute eligibility using point system
     * @dev Awards points based on multiple criteria
     */
    function _computeEligibility(address student) private {
        StudentData storage data = studentData[student];
        uint16 points = 0;

        // Age points (20 points max) - different scoring for different age groups
        if (data.age >= 10 && data.age <= 18) {
            // Traditional school age - full points
            points += AGE_POINTS;
        } else if (data.age >= 19 && data.age <= 30) {
            // Young adult education - 75% points
            points += (AGE_POINTS * 3) / 4;
        } else if (data.age >= 31 && data.age <= 50) {
            // Adult continuing education - 50% points
            points += AGE_POINTS / 2;
        } else if (data.age >= 5 && data.age <= 9) {
            // Early childhood - 75% points
            points += (AGE_POINTS * 3) / 4;
        } else if (data.age >= 51 && data.age <= MAX_AGE) {
            // Senior education - 50% points
            points += AGE_POINTS / 2;
        }

        // Exam score points (40 points max)
        if (data.examScore >= 90) {
            points += EXAM_POINTS;
        } else if (data.examScore >= 80) {
            points += (EXAM_POINTS * 3) / 4;
        } else if (data.examScore >= 70) {
            points += EXAM_POINTS / 2;
        } else if (data.examScore >= MIN_EXAM_SCORE) {
            points += EXAM_POINTS / 4;
        }

        // Income points (20 points max) - lower income gets more points
        if (data.incomeBracket == 1) {
            points += INCOME_POINTS;
        } else if (data.incomeBracket == 2) {
            points += (INCOME_POINTS * 3) / 4;
        } else if (data.incomeBracket == 3) {
            points += INCOME_POINTS / 2;
        } else if (data.incomeBracket <= 5) {
            points += INCOME_POINTS / 4;
        }

        // Extracurricular points (10 points max)
        points += data.extracurricularScore;

        // Interview points (10 points max)
        points += data.interviewScore;

        data.totalPoints = points;
        data.isEligible = points >= PASSING_SCORE;

        emit EligibilityComputed(student);
    }

    /**
     * @notice Get eligibility result
     * @return isEligible Boolean indicating eligibility
     * @return totalPoints Total points scored
     */
    function getEligibilityResult(address student) external view returns (bool isEligible, uint16 totalPoints) {
        require(studentData[student].hasSubmitted, "No data submitted");
        return (studentData[student].isEligible, studentData[student].totalPoints);
    }

    /**
     * @notice Get student details (public info only)
     */
    function getStudentInfo(address student) external view returns (
        string memory fullName,
        uint8 age,
        uint16 totalPoints,
        bool isEligible,
        uint256 submissionTime
    ) {
        require(studentData[student].hasSubmitted, "No data submitted");
        StudentData storage data = studentData[student];
        return (data.fullName, data.age, data.totalPoints, data.isEligible, data.submissionTime);
    }

    /**
     * @notice Check if student has submitted data
     */
    function hasSubmittedData(address student) external view returns (bool) {
        return studentData[student].hasSubmitted;
    }

    /**
     * @notice Admin can update eligibility criteria (future enhancement)
     * @dev For now, criteria are constants. This can be extended.
     */
    function updateAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
