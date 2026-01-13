import { useState, useMemo } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { useAppStore } from '../../stores/appStore'
import StatusColumn from './StatusColumn'
import InspanningCard from './InspanningCard'

const statusKolommen = [
  { id: 'planned', label: 'Gepland' },
  { id: 'in_progress', label: 'In uitvoering' },
  { id: 'completed', label: 'Afgerond' }
]

const domeinColors = {
  Mens: 'bg-blue-500',
  Proces: 'bg-purple-500',
  Systeem: 'bg-orange-500',
  Cultuur: 'bg-green-500'
}

const levenscyclusColors = {
  verkennen: 'bg-slate-500',
  opbouwen: 'bg-blue-500',
  uitvoeren: 'bg-green-500',
  afbouwen: 'bg-purple-500'
}

export default function RoadmapKanban({ swimlaneBy = 'domein', onCardClick }) {
  const { inspanningen, updateInspanning } = useAppStore()
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    console.log('Drag end:', { activeId: active?.id, overId: over?.id })

    if (over) {
      // Bepaal de nieuwe status
      let newStatus = null
      const overId = String(over.id)

      // Check of we over een kolom droppen (kolom IDs bevatten 'column-')
      if (overId.includes('column-')) {
        // Extract status from column ID (e.g., 'column-Systeem-planned' -> 'planned')
        const parts = overId.split('-')
        newStatus = parts[parts.length - 1]
      } else {
        // We droppen over een andere kaart, vind de status van die kaart
        const overItem = inspanningen.find(i => String(i.id) === overId)
        if (overItem) {
          newStatus = overItem.status
        }
      }

      console.log('New status:', newStatus)

      if (newStatus && statusKolommen.some(k => k.id === newStatus)) {
        const activeItem = inspanningen.find(i => String(i.id) === String(active.id))
        if (activeItem && activeItem.status !== newStatus) {
          console.log('Updating inspanning:', active.id, 'to status:', newStatus)
          updateInspanning(active.id, { status: newStatus })
        }
      }
    }

    setActiveId(null)
  }

  const activeInspanning = activeId
    ? inspanningen.find(i => i.id === activeId)
    : null

  // Groepeer per swimlane
  const swimlanes = useMemo(() => {
    if (swimlaneBy === 'none') {
      return { 'Alle Inspanningen': inspanningen }
    }

    return inspanningen.reduce((acc, item) => {
      const key = item[swimlaneBy] || 'Overig'
      if (!acc[key]) acc[key] = []
      acc[key].push(item)
      return acc
    }, {})
  }, [inspanningen, swimlaneBy])

  // Sorteer swimlanes op volgorde
  const sortedSwimlanes = useMemo(() => {
    if (swimlaneBy === 'domein') {
      const order = ['Mens', 'Proces', 'Systeem', 'Cultuur']
      return Object.entries(swimlanes).sort(([a], [b]) => {
        return order.indexOf(a) - order.indexOf(b)
      })
    }
    if (swimlaneBy === 'levenscyclus') {
      const order = ['verkennen', 'opbouwen', 'uitvoeren', 'afbouwen']
      return Object.entries(swimlanes).sort(([a], [b]) => {
        return order.indexOf(a) - order.indexOf(b)
      })
    }
    return Object.entries(swimlanes)
  }, [swimlanes, swimlaneBy])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-8">
        {sortedSwimlanes.map(([swimlaneName, items]) => (
          <div key={swimlaneName}>
            {/* Swimlane Header */}
            {swimlaneBy !== 'none' && (
              <div className="flex items-center gap-3 mb-4">
                {swimlaneBy === 'domein' && domeinColors[swimlaneName] && (
                  <div className={`w-3 h-3 rounded-full ${domeinColors[swimlaneName]}`} />
                )}
                {swimlaneBy === 'levenscyclus' && levenscyclusColors[swimlaneName] && (
                  <div className={`w-3 h-3 rounded-full ${levenscyclusColors[swimlaneName]}`} />
                )}
                <h3 className="text-lg font-semibold text-slate-800 capitalize">{swimlaneName}</h3>
                <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs text-slate-600">
                  {items.length} inspanningen
                </span>
              </div>
            )}

            {/* Kolommen */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {statusKolommen.map(kolom => (
                <StatusColumn
                  key={`${swimlaneName}-${kolom.id}`}
                  id={`column-${swimlaneName}-${kolom.id}`}
                  status={kolom.id}
                  items={items.filter(i => i.status === kolom.id)}
                  onCardClick={onCardClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeInspanning ? (
          <div className="w-80">
            <InspanningCard inspanning={activeInspanning} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
