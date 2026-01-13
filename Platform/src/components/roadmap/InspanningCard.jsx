import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Briefcase, Repeat, GraduationCap, Monitor } from 'lucide-react'

const typeIcons = {
  project: Briefcase,
  proces: Repeat,
  leer: GraduationCap,
  systeem: Monitor
}

const typeColors = {
  project: 'border-l-blue-500 bg-blue-50',
  proces: 'border-l-purple-500 bg-purple-50',
  leer: 'border-l-green-500 bg-green-50',
  systeem: 'border-l-orange-500 bg-orange-50'
}

export default function InspanningCard({ inspanning, isDragging = false, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: inspanning.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  }

  const TypeIcon = typeIcons[inspanning.type] || Briefcase

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg shadow-sm border-l-4 p-4 cursor-grab active:cursor-grabbing
        ${typeColors[inspanning.type] || 'border-l-slate-500 bg-slate-50'}
        ${isDragging ? 'shadow-lg rotate-1 scale-105' : 'hover:shadow-md'}
        transition-all duration-200
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1 text-slate-400">
          <GripVertical className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <TypeIcon className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-mono text-slate-500">{inspanning.code}</span>
          </div>

          <h4 className="font-medium text-slate-800 truncate">{inspanning.naam}</h4>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="px-2 py-0.5 bg-white/80 rounded border border-slate-200">{inspanning.domein}</span>
            <span>M{inspanning.startMaand} - M{inspanning.eindMaand}</span>
          </div>

          {inspanning.eigenaar && (
            <div className="mt-2 text-xs text-slate-500">
              {inspanning.eigenaar}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
