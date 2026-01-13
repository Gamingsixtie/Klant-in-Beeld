import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import InspanningCard from './InspanningCard'

const statusConfig = {
  planned: {
    label: 'Gepland',
    color: 'bg-slate-50',
    borderColor: 'border-slate-200',
    headerBg: 'bg-slate-100'
  },
  in_progress: {
    label: 'In uitvoering',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    headerBg: 'bg-blue-100'
  },
  completed: {
    label: 'Afgerond',
    color: 'bg-green-50',
    borderColor: 'border-green-200',
    headerBg: 'bg-green-100'
  }
}

export default function StatusColumn({ id, status, items, onCardClick }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const config = statusConfig[status] || statusConfig.planned

  return (
    <div
      ref={setNodeRef}
      className={`
        w-80 min-w-80 rounded-xl border transition-all duration-200
        ${config.color}
        ${config.borderColor}
        ${isOver ? 'ring-2 ring-blue-400 ring-inset scale-[1.02]' : ''}
      `}
    >
      {/* Column Header */}
      <div className={`px-4 py-3 ${config.headerBg} rounded-t-xl border-b ${config.borderColor}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-700">{config.label}</h3>
          <span className="px-2.5 py-1 bg-white rounded-full text-sm font-medium text-slate-600 shadow-sm">
            {items.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div className="p-3 min-h-[200px]">
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map(item => (
              <InspanningCard
                key={item.id}
                inspanning={item}
                onClick={() => onCardClick?.(item)}
              />
            ))}
          </div>
        </SortableContext>

        {items.length === 0 && (
          <div className="py-8 text-center text-slate-400 border-2 border-dashed border-slate-300 rounded-lg bg-white/50">
            <p className="text-sm">Sleep inspanningen hierheen</p>
          </div>
        )}
      </div>
    </div>
  )
}
