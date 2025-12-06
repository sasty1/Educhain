import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Brain, FileText, Search, Shield, Lock, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* DNA Helix Pattern Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dna-pattern" x="0" y="0" width="160" height="400" patternUnits="userSpaceOnUse">
              <ellipse cx="80" cy="50" rx="60" ry="20" fill="none" stroke="#10b981" strokeWidth="2" />
              <ellipse cx="80" cy="150" rx="60" ry="20" fill="none" stroke="#10b981" strokeWidth="2" />
              <ellipse cx="80" cy="250" rx="60" ry="20" fill="none" stroke="#10b981" strokeWidth="2" />
              <ellipse cx="80" cy="350" rx="60" ry="20" fill="none" stroke="#10b981" strokeWidth="2" />
              <line x1="20" y1="50" x2="20" y2="150" stroke="#10b981" strokeWidth="2" />
              <line x1="140" y1="50" x2="140" y2="150" stroke="#10b981" strokeWidth="2" />
              <line x1="20" y1="150" x2="20" y2="250" stroke="#10b981" strokeWidth="2" />
              <line x1="140" y1="150" x2="140" y2="250" stroke="#10b981" strokeWidth="2" />
              <line x1="20" y1="250" x2="20" y2="350" stroke="#10b981" strokeWidth="2" />
              <line x1="140" y1="250" x2="140" y2="350" stroke="#10b981" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dna-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-emerald-500/30 blur-3xl rounded-full animate-pulse" />
            <Brain className="h-24 w-24 text-emerald-500 relative z-10 mx-auto" strokeWidth={1.5} />
          </div>
          <h1 className="text-7xl font-bold text-emerald-400 mb-6 tracking-tight">
            EduChain
          </h1>
          <p className="text-2xl text-emerald-500 mb-4 font-medium">
            "Privacy-First Education Verification"
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            The first confidential school admission scoring platform powered by
            <span className="text-emerald-400 font-semibold"> Fully Homomorphic Encryption</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-gray-900/50 border-emerald-900/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
            <CardHeader>
              <Shield className="h-10 w-10 text-emerald-500 mb-3" strokeWidth={1.5} />
              <CardTitle className="text-emerald-400">Privacy First</CardTitle>
              <CardDescription className="text-gray-400">
                Your data stays encrypted on the blockchain with FHE technology
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-emerald-900/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
            <CardHeader>
              <Lock className="h-10 w-10 text-emerald-500 mb-3" strokeWidth={1.5} />
              <CardTitle className="text-emerald-400">Fully Encrypted</CardTitle>
              <CardDescription className="text-gray-400">
                Compute on encrypted data without revealing sensitive information
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-900/50 border-emerald-900/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300">
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-emerald-500 mb-3" strokeWidth={1.5} />
              <CardTitle className="text-emerald-400">Fair Scoring</CardTitle>
              <CardDescription className="text-gray-400">
                Transparent point-based evaluation with verifiable results
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="bg-gray-900/50 border-emerald-900/50 backdrop-blur-sm mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-emerald-400">How It Works</CardTitle>
            <CardDescription className="text-gray-400 text-base">Simple 4-step process to check your eligibility</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex-shrink-0 border border-emerald-500/50">
                  1
                </span>
                <div>
                  <p className="font-semibold text-white text-lg">Connect your MetaMask wallet</p>
                  <p className="text-gray-400">Securely connect to the blockchain network</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex-shrink-0 border border-emerald-500/50">
                  2
                </span>
                <div>
                  <p className="font-semibold text-white text-lg">Submit your application</p>
                  <p className="text-gray-400">Provide personal and academic details - all encrypted</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex-shrink-0 border border-emerald-500/50">
                  3
                </span>
                <div>
                  <p className="font-semibold text-white text-lg">FHE smart contract calculates your score</p>
                  <p className="text-gray-400">Automated evaluation on encrypted data out of 100 points</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex-shrink-0 border border-emerald-500/50">
                  4
                </span>
                <div>
                  <p className="font-semibold text-white text-lg">Check your status</p>
                  <p className="text-gray-400">View detailed score breakdown with complete privacy</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link href="/apply-enhanced">
            <Button size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-emerald-500/50 transition-all duration-300 hover:shadow-emerald-500/70">
              <FileText className="mr-2 h-6 w-6" />
              Apply Now
            </Button>
          </Link>
          <Link href="/check-enhanced">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 py-6 text-lg font-semibold transition-all duration-300">
              <Search className="mr-2 h-6 w-6" />
              Check Status
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 border-t border-emerald-900/30 pt-8">
          <p className="text-sm">
            Created by{' '}
            <a
              href="https://twitter.com/iam_sasty"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
            >
              @iam_sasty
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
