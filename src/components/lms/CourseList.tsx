'use client'
import { useState, useMemo } from 'react'
import { Search, Filter, BookOpen, ChevronDown } from 'lucide-react'
import { Course } from '@/lib/courses'
import CourseCard from './CourseCard'

interface CourseListProps {
  courses: Course[]
  title?: string
  showSearch?: boolean
  showFilters?: boolean
  className?: string
}

export default function CourseList({ 
  courses, 
  title = 'Available Courses',
  showSearch = true,
  showFilters = true,
  className = '' 
}: CourseListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'duration'>('title')

  // Extract all unique tags and difficulties
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    courses.forEach(course => {
      course.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [courses])

  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term) ||
        course.tags.some(tag => tag.toLowerCase().includes(term))
      )
    }

    // Difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(course => course.difficulty === selectedDifficulty)
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(course => course.tags.includes(selectedTag))
    }

    // Sort courses
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'difficulty':
          const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'duration':
          // Simple duration comparison (assuming format like "4 hours")
          const getDurationValue = (duration: string) => {
            const match = duration.match(/(\d+)/)
            return match ? parseInt(match[1]) : 0
          }
          return getDurationValue(a.duration) - getDurationValue(b.duration)
        default:
          return 0
      }
    })
  }, [courses, searchTerm, selectedDifficulty, selectedTag, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedDifficulty('')
    setSelectedTag('')
    setSortBy('title')
  }

  const hasActiveFilters = searchTerm || selectedDifficulty || selectedTag || sortBy !== 'title'

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">
          {courses.length} course{courses.length !== 1 ? 's' : ''} available
          {filteredAndSortedCourses.length !== courses.length && (
            <span className="ml-1 text-slate-600">
              ({filteredAndSortedCourses.length} shown)
            </span>
          )}
        </p>
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            {showSearch && (
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Filters */}
            {showFilters && (
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Difficulty Filter */}
                <div className="relative">
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>

                {/* Tag Filter */}
                <div className="relative">
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="">All Topics</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'title' | 'difficulty' | 'duration')}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="title">Sort by Title</option>
                    <option value="difficulty">Sort by Difficulty</option>
                    <option value="duration">Sort by Duration</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-slate-600 hover:text-slate-800 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {filteredAndSortedCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-4">
            {courses.length === 0 
              ? "There are no courses available at the moment."
              : "Try adjusting your search criteria or filters."
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Filter size={16} />
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}