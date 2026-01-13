export function Card({ children, className = "", hover = true, padding = "default" }) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    default: "p-5",
    lg: "p-6"
  }

  const baseClass = "bg-white rounded-xl border border-gray-100"
  const hoverClass = hover ? "hover:border-gray-200 hover:shadow-md transition-all duration-200" : ""
  
  return (
    <div className={baseClass + " " + hoverClass + " " + paddingClasses[padding] + " " + className}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, icon: Icon }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 bg-gray-50 rounded-lg">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900 text-[15px]">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>
}

export function CardFooter({ children, className = "" }) {
  return (
    <div className={"mt-4 pt-4 border-t border-gray-100 " + className}>
      {children}
    </div>
  )
}
