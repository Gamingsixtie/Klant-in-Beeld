export function PageHeader({ 
  title, 
  subtitle, 
  action,
  breadcrumb,
  gradient = false
}) {
  if (gradient) {
    return (
      <div className="bg-gradient-to-r from-[#003366] to-[#002855] rounded-xl p-6 text-white mb-6">
        {breadcrumb && (
          <div className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">
            {breadcrumb}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="text-white/70 text-sm mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className="mb-6">
      {breadcrumb && (
        <div className="text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
          {breadcrumb}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}
