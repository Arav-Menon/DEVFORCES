'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Plus, Trash2, Eye, AlertCircle, X } from 'lucide-react';

export default function CreateProblemPage() {
  const [currentStep, setCurrentStep] = useState('details');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'medium',
    tags: [] as string[],
    points: 100,
    inputFormat: '',
    outputFormat: '',
    constraints: [] as string[],
  });

  const [testCases, setTestCases] = useState([
    { id: 1, input: '', output: '', isHidden: false },
  ]);

  const [newTag, setNewTag] = useState('');
  const [newConstraint, setNewConstraint] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const addConstraint = () => {
    if (newConstraint.trim()) {
      setFormData(prev => ({
        ...prev,
        constraints: [...prev.constraints, newConstraint.trim()],
      }));
      setNewConstraint('');
    }
  };

  const removeConstraint = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      constraints: prev.constraints.filter((_, i) => i !== idx),
    }));
  };

  const addTestCase = () => {
    const newId = Math.max(...testCases.map(tc => tc.id), 0) + 1;
    setTestCases(prev => [...prev, { id: newId, input: '', output: '', isHidden: false }]);
  };

  const removeTestCase = (id: number) => {
    if (testCases.length > 1) {
      setTestCases(prev => prev.filter(tc => tc.id !== id));
    }
  };

  const updateTestCase = (id: number, field: string, value: string | boolean) => {
    setTestCases(prev =>
      prev.map(tc =>
        tc.id === id ? { ...tc, [field]: value } : tc
      )
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Problem title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.inputFormat.trim()) {
      newErrors.inputFormat = 'Input format is required';
    }
    if (!formData.outputFormat.trim()) {
      newErrors.outputFormat = 'Output format is required';
    }
    if (formData.constraints.length === 0) {
      newErrors.constraints = 'At least one constraint is required';
    }
    if (testCases.some(tc => !tc.input.trim() || !tc.output.trim())) {
      newErrors.testCases = 'All test cases must have input and output';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Problem submitted:', { ...formData, testCases });
      // Handle problem creation
    }
  };

  const handlePreview = () => {
    if (validateForm()) {
      setPreview(!preview);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/contests" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold">Create New Problem</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {!preview ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Steps */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-3">
                {[
                  { id: 'details', label: 'Problem Details' },
                  { id: 'format', label: 'Input/Output' },
                  { id: 'testcases', label: 'Test Cases' },
                ].map(step => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      currentStep === step.id
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                        : 'hover:bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Problem Details Step */}
                {currentStep === 'details' && (
                  <div className="space-y-6">
                    <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30">
                      <h2 className="text-2xl font-bold mb-6">Problem Details</h2>

                      {/* Title */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Problem Title *</label>
                        <Input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="e.g., Two Sum, Merge K Lists"
                          className="w-full bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.title && (
                          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.title}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Description *</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Write a clear problem statement. Markdown is supported."
                          rows={8}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition resize-none"
                        />
                        {errors.description && (
                          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.description}
                          </div>
                        )}
                      </div>

                      {/* Difficulty & Points */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Difficulty</label>
                          <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white hover:border-zinc-600 focus:border-blue-500 focus:outline-none transition"
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Points</label>
                          <Input
                            type="number"
                            name="points"
                            value={formData.points}
                            onChange={handleChange}
                            min="50"
                            max="500"
                            className="w-full bg-zinc-900 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Tags</label>
                        <div className="flex gap-2 mb-3">
                          <Input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            placeholder="Add tag (e.g., Array, Hash Table)"
                            className="flex-1 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                          />
                          <Button
                            type="button"
                            onClick={addTag}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map(tag => (
                            <div
                              key={tag}
                              className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 flex items-center gap-2 text-sm"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="hover:text-blue-300"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Input/Output Format Step */}
                {currentStep === 'format' && (
                  <div className="space-y-6">
                    <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30">
                      <h2 className="text-2xl font-bold mb-6">Input/Output Format</h2>

                      {/* Input Format */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Input Format *</label>
                        <textarea
                          name="inputFormat"
                          value={formData.inputFormat}
                          onChange={handleChange}
                          placeholder="Describe the input format here"
                          rows={4}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition resize-none"
                        />
                        {errors.inputFormat && (
                          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.inputFormat}
                          </div>
                        )}
                      </div>

                      {/* Output Format */}
                      <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Output Format *</label>
                        <textarea
                          name="outputFormat"
                          value={formData.outputFormat}
                          onChange={handleChange}
                          placeholder="Describe the output format here"
                          rows={4}
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition resize-none"
                        />
                        {errors.outputFormat && (
                          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.outputFormat}
                          </div>
                        )}
                      </div>

                      {/* Constraints */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Constraints *</label>
                        <div className="flex gap-2 mb-3">
                          <Input
                            type="text"
                            value={newConstraint}
                            onChange={(e) => setNewConstraint(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addConstraint())}
                            placeholder="e.g., 1 <= n <= 10^5"
                            className="flex-1 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                          />
                          <Button
                            type="button"
                            onClick={addConstraint}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <ul className="space-y-2">
                          {formData.constraints.map((constraint, idx) => (
                            <li key={idx} className="p-3 rounded bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
                              <span className="text-sm">{constraint}</span>
                              <button
                                type="button"
                                onClick={() => removeConstraint(idx)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                        {errors.constraints && (
                          <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {errors.constraints}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Test Cases Step */}
                {currentStep === 'testcases' && (
                  <div className="space-y-6">
                    <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Test Cases</h2>
                        <Button
                          type="button"
                          onClick={addTestCase}
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Test Case
                        </Button>
                      </div>

                      {errors.testCases && (
                        <div className="flex items-center gap-2 mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.testCases}
                        </div>
                      )}

                      <div className="space-y-6">
                        {testCases.map((testCase, idx) => (
                          <div
                            key={testCase.id}
                            className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/20"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-semibold">Test Case {idx + 1}</span>
                              <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={testCase.isHidden}
                                    onChange={(e) => updateTestCase(testCase.id, 'isHidden', e.target.checked)}
                                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 accent-blue-500 cursor-pointer"
                                  />
                                  <span>Hidden Test Case</span>
                                </label>
                                {testCases.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeTestCase(testCase.id)}
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold mb-2 text-zinc-400">Input</label>
                                <textarea
                                  value={testCase.input}
                                  onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                                  placeholder="Input data"
                                  rows={4}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition font-mono text-sm resize-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold mb-2 text-zinc-400">Expected Output</label>
                                <textarea
                                  value={testCase.output}
                                  onChange={(e) => updateTestCase(testCase.id, 'output', e.target.value)}
                                  placeholder="Expected output"
                                  rows={4}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-600 focus:border-blue-500 focus:outline-none transition font-mono text-sm resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-zinc-600 text-white hover:bg-zinc-900"
                    onClick={handlePreview}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Create Problem
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Preview Mode
          <div className="space-y-8">
            <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{formData.title}</h1>
                <Button
                  variant="outline"
                  className="border-zinc-600 text-white hover:bg-zinc-900"
                  onClick={handlePreview}
                >
                  Back to Edit
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  formData.difficulty === 'easy' ? 'bg-green-400/10 text-green-400' :
                  formData.difficulty === 'medium' ? 'bg-yellow-400/10 text-yellow-400' :
                  'bg-red-400/10 text-red-400'
                }`}>
                  {formData.difficulty.charAt(0).toUpperCase() + formData.difficulty.slice(1)}
                </span>
                <span className="text-zinc-400">{formData.points} points</span>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <h3 className="text-lg font-bold mb-3">Description</h3>
                <p className="text-zinc-300 whitespace-pre-wrap">{formData.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-3">Input Format</h3>
                  <p className="text-zinc-300 whitespace-pre-wrap">{formData.inputFormat}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">Output Format</h3>
                  <p className="text-zinc-300 whitespace-pre-wrap">{formData.outputFormat}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">Constraints</h3>
                <ul className="space-y-2">
                  {formData.constraints.map((constraint, idx) => (
                    <li key={idx} className="text-zinc-300 flex gap-2">
                      <span>•</span>
                      <span>{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {formData.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold mb-3">Test Cases ({testCases.length})</h3>
                <div className="space-y-4">
                  {testCases.map((tc, idx) => (
                    <div key={tc.id} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                      <p className="text-sm text-zinc-400 mb-2">
                        Test Case {idx + 1} {tc.isHidden && <span className="text-yellow-400">(Hidden)</span>}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm font-mono">
                        <div>
                          <span className="text-zinc-500">Input:</span>
                          <div className="text-white whitespace-pre-wrap mt-1">{tc.input}</div>
                        </div>
                        <div>
                          <span className="text-zinc-500">Output:</span>
                          <div className="text-white whitespace-pre-wrap mt-1">{tc.output}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3 justify-end">
                <Button
                  variant="outline"
                  className="border-zinc-600 text-white hover:bg-zinc-900"
                  onClick={handlePreview}
                >
                  Back to Edit
                </Button>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Create Problem
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
