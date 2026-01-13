export function Badge({ children, variant = "default", size = "default" }) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    error: "bg-red-100 text-red-800",
    info: "bg-cyan-100 text-cyan-800"
  }

  const sizes = {
    sm: "px-1.5 py-0.5 text-[10px]",
    default: "px-2 py-1 text-xs",
    lg: "px-2.5 py-1 text-sm"
  }

  return (
    <span className={"inline-flex items-center font-medium rounded-full " + variants[variant] + " " + sizes[size]}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const config = {
    completed: { variant: "success", label: "Afgerond" },
    in_progress: { variant: "primary", label: "In uitvoering" },
    pending: { variant: "default", label: "Gepland" },
    planned: { variant: "warning", label: "Gepland" },
    active: { variant: "success", label: "Actief" },
    inactive: { variant: "default", label: "Inactief" }
  }

  const { variant, label } = config[status] || config.default

  return <Badge variant={variant}>{label}</Badge>
}
