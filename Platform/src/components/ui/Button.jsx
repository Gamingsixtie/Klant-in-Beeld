export function Button({ 
  children, 
  variant = "primary", 
  size = "default", 
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props 
}) {
  const variants = {
    primary: "bg-[#003366] text-white hover:bg-[#002855] active:bg-[#002244]",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200",
    accent: "bg-[#ff6600] text-white hover:bg-[#e55a00] active:bg-[#cc5000]",
    outline: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    default: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base"
  }

  const baseClass = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2"

  return (
    <button 
      className={baseClass + " " + variants[variant] + " " + sizes[size] + " " + className}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
    </button>
  )
}
