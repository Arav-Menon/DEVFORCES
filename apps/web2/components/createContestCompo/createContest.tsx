'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function CreateContestPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    duration: '',
    visibility: 'public',
    difficulty: 'mixed',
  });

  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Contest title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle contest creation
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
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/contests" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to Contests
          </Link>
          <h1 className="text-3xl font-bold">Create New Contest</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Contest Title *</label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Spring Challenge 2026"
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
                  placeholder="Describe your contest, rules, and objectives..."
                  rows={6}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition resize-none"
                />
                {errors.description && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </div>
                )}
                <p className="text-xs text-zinc-500 mt-2">Markdown formatting is supported</p>
              </div>
            </div>

            {/* Scheduling Section */}
            <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30">
              <h2 className="text-2xl font-bold mb-6">Scheduling</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Start Date *</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.startDate && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.startDate}
                    </div>
                  )}
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Start Time *</label>
                  <Input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.startTime && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.startTime}
                    </div>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold mb-2">Duration (minutes) *</label>
                <Input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 120"
                  min="30"
                  max="480"
                  className="w-full bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.duration && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.duration}
                  </div>
                )}
                <p className="text-xs text-zinc-500 mt-2">Must be between 30 and 480 minutes</p>
              </div>
            </div>

            {/* Settings Section */}
            <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30">
              <h2 className="text-2xl font-bold mb-6">Settings</h2>

              {/* Visibility */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Visibility</label>
                <div className="flex gap-4">
                  {[
                    { value: 'public', label: 'Public', description: 'Anyone can see and join' },
                    { value: 'private', label: 'Private', description: 'Invite only' },
                  ].map(option => (
                    <label key={option.value} className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition"
                      style={{
                        borderColor: formData.visibility === option.value ? '#3b82f6' : '#3f3f46',
                        backgroundColor: formData.visibility === option.value ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      }}>
                      <input
                        type="radio"
                        name="visibility"
                        value={option.value}
                        checked={formData.visibility === option.value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{option.label}</p>
                        <p className="text-sm text-zinc-400">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-semibold mb-2">Problem Difficulty Level</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white hover:border-zinc-600 focus:border-blue-500 focus:outline-none transition"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>

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
                Create Contest
              </Button>
            </div>
          </form>
        ) : (
          // Preview Mode
          <div className="space-y-8">
            <div className="border border-zinc-800 rounded-lg p-8 bg-zinc-900/30">
              <h2 className="text-3xl font-bold mb-4">{formData.title}</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-lg bg-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">Start Date</p>
                  <p className="font-semibold">{formData.startDate}</p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">Start Time</p>
                  <p className="font-semibold">{formData.startTime}</p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">Duration</p>
                  <p className="font-semibold">{formData.duration} minutes</p>
                </div>
                <div className="p-4 rounded-lg bg-zinc-800">
                  <p className="text-sm text-zinc-400 mb-1">Visibility</p>
                  <p className="font-semibold capitalize">{formData.visibility}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-3">Description</h3>
              <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{formData.description}</p>

              <div className="mt-8 flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="border-zinc-600 text-white hover:bg-zinc-900"
                  onClick={handlePreview}
                >
                  <EyeOff className="w-4 h-4 mr-2" />
                  Back to Edit
                </Button>
                <Button
                  type="button"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => {
                    console.log('Contest published:', formData);
                    // Handle publication
                  }}
                >
                  Publish Contest
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
