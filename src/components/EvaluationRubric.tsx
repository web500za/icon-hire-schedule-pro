
import React, { useState } from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface RubricCategory {
  category: string;
  weight: string;
  criteria: {
    level: number;
    descriptor: string;
    description: string;
  }[];
}

const EvaluationRubric = () => {
  const [candidateName, setCandidateName] = useState('');
  const [position, setPosition] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [ratings, setRatings] = useState<{[key: string]: number}>({});

  const rubricData: RubricCategory[] = [
    {
      category: "Technical Expertise",
      weight: "(25%)",
      criteria: [
        { level: 5, descriptor: "Exceptional", description: "Demonstrates comprehensive oncology knowledge, stays current with latest research, shows deep understanding of treatment protocols and clinical trials" },
        { level: 4, descriptor: "Proficient", description: "Strong domain knowledge with good understanding of oncology principles, familiar with current practices and emerging treatments" },
        { level: 3, descriptor: "Competent", description: "Adequate technical knowledge for the role, understands basic oncology concepts and standard procedures" },
        { level: 2, descriptor: "Developing", description: "Limited technical knowledge, shows potential but requires significant training and development" },
        { level: 1, descriptor: "Inadequate", description: "Insufficient technical knowledge for the role, lacks basic understanding of oncology principles" }
      ]
    },
    {
      category: "Communication Skills",
      weight: "(20%)",
      criteria: [
        { level: 5, descriptor: "Exceptional", description: "Excellent verbal/written communication, demonstrates high empathy with patients/families, exceptional teamwork and collaboration skills" },
        { level: 4, descriptor: "Proficient", description: "Clear and effective communication, shows good empathy and interpersonal skills, works well in team settings" },
        { level: 3, descriptor: "Competent", description: "Generally communicates well, adequate empathy and teamwork abilities, can work effectively with others" },
        { level: 2, descriptor: "Developing", description: "Communication needs improvement, limited demonstration of empathy, some difficulty working in teams" },
        { level: 1, descriptor: "Inadequate", description: "Poor communication skills, lacks empathy, struggles with teamwork and collaboration" }
      ]
    },
    {
      category: "Cultural Fit",
      weight: "(20%)",
      criteria: [
        { level: 5, descriptor: "Exceptional", description: "Perfectly aligns with Icon Oncology values, demonstrates patient-centered care philosophy, shows commitment to excellence and innovation" },
        { level: 4, descriptor: "Proficient", description: "Strong alignment with organizational values, understands patient-centered approach, committed to quality care" },
        { level: 3, descriptor: "Competent", description: "Generally aligns with company values, shows understanding of patient care importance, adequate commitment to quality" },
        { level: 2, descriptor: "Developing", description: "Some alignment with values but needs development, limited understanding of patient-centered care philosophy" },
        { level: 1, descriptor: "Inadequate", description: "Poor cultural fit, does not align with organizational values or patient care philosophy" }
      ]
    },
    {
      category: "Problem-Solving",
      weight: "(20%)",
      criteria: [
        { level: 5, descriptor: "Exceptional", description: "Excellent analytical thinking, provides innovative solutions to complex cases, demonstrates superior clinical judgment and decision-making" },
        { level: 4, descriptor: "Proficient", description: "Good problem-solving abilities, can handle complex situations effectively, shows sound clinical judgment" },
        { level: 3, descriptor: "Competent", description: "Adequate problem-solving skills, can manage routine situations well, shows developing clinical judgment" },
        { level: 2, descriptor: "Developing", description: "Limited problem-solving abilities, struggles with complex situations, needs guidance for decision-making" },
        { level: 1, descriptor: "Inadequate", description: "Poor analytical skills, cannot handle complex problems, lacks clinical judgment" }
      ]
    },
    {
      category: "Professionalism",
      weight: "(15%)",
      criteria: [
        { level: 5, descriptor: "Exceptional", description: "Impeccable professional appearance and demeanor, excellent punctuality and reliability, demonstrates highest ethical standards" },
        { level: 4, descriptor: "Proficient", description: "Professional appearance and behavior, reliable and punctual, shows good ethical awareness" },
        { level: 3, descriptor: "Competent", description: "Generally professional, adequate punctuality and reliability, understands ethical requirements" },
        { level: 2, descriptor: "Developing", description: "Some professional concerns, occasional punctuality issues, needs development in professional standards" },
        { level: 1, descriptor: "Inadequate", description: "Unprofessional appearance or behavior, poor punctuality, lacks understanding of professional standards" }
      ]
    }
  ];

  const updateRating = (category: string, rating: number) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const calculateOverallScore = () => {
    const weights = { "Technical Expertise": 0.25, "Communication Skills": 0.20, "Cultural Fit": 0.20, "Problem-Solving": 0.20, "Professionalism": 0.15 };
    let totalScore = 0;
    let totalWeight = 0;
    
    Object.entries(ratings).forEach(([category, rating]) => {
      if (weights[category]) {
        totalScore += rating * weights[category];
        totalWeight += weights[category];
      }
    });
    
    return totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : '0.0';
  };

  const exportToPDF = () => {
    window.print();
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Icon Oncology - Candidate Evaluation Rubric'],
      [''],
      ['Candidate Name:', candidateName],
      ['Position:', position],
      ['Interview Date:', interviewDate],
      [''],
      ['Category', 'Rating', 'Weight', 'Comments'],
      ...rubricData.map(category => [
        category.category,
        ratings[category.category] || 'Not Rated',
        category.weight,
        ''
      ]),
      [''],
      ['Overall Score:', calculateOverallScore() + '/5.0']
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evaluation-rubric-${candidateName.replace(/\s+/g, '-').toLowerCase()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full print:shadow-none">
      <CardHeader className="border-b bg-slate-50 print:bg-white">
        <div className="flex justify-between items-center print:block">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600 print:hidden" />
              Candidate Evaluation Rubric
            </CardTitle>
            <p className="text-slate-600 mt-1">Icon Oncology - Healthcare Professional Assessment</p>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button onClick={exportToPDF} variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={exportToCSV} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Candidate Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg print:bg-white print:border">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-gray-300"
              placeholder="Enter candidate name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-gray-300"
              placeholder="Enter position"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date</label>
            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-gray-300"
            />
          </div>
        </div>

        {/* Evaluation Criteria */}
        <div className="space-y-8">
          {rubricData.map((category) => (
            <div key={category.category} className="border rounded-lg p-6 print:border-gray-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  {category.category} 
                  <span className="text-sm font-normal text-gray-500">{category.weight}</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => updateRating(category.category, rating)}
                        className={`w-8 h-8 rounded-full border-2 text-sm font-semibold transition-colors print:border-gray-400 ${
                          ratings[category.category] === rating
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 print:bg-gray-100">
                      <th className="text-left p-2 font-semibold border-b">Level</th>
                      <th className="text-left p-2 font-semibold border-b">Descriptor</th>
                      <th className="text-left p-2 font-semibold border-b">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.criteria.map((criterion) => (
                      <tr key={criterion.level} className="border-b hover:bg-gray-25">
                        <td className="p-2 font-medium text-center">{criterion.level}</td>
                        <td className="p-2 font-medium">{criterion.descriptor}</td>
                        <td className="p-2 text-gray-700">{criterion.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments:</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 print:border-gray-300"
                  rows={3}
                  placeholder="Enter specific observations or comments for this category..."
                />
              </div>
            </div>
          ))}
        </div>

        {/* Overall Score */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border print:bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Overall Assessment Score</h3>
              <p className="text-sm text-gray-600 mt-1">Weighted average based on category importance</p>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {calculateOverallScore()}<span className="text-lg text-gray-500">/5.0</span>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Final Recommendation:</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Provide your overall assessment and recommendation for this candidate..."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluationRubric;
