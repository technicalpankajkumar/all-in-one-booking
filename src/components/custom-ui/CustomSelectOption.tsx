import * as React from "react"
import { Check, ChevronDown, X, Loader2, AlertCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
  group?: string
  children?: SelectOption[]
  parent?: string
  level?: number
  isLeaf?: boolean
  category?: string
  tags?: string[]
  metadata?: Record<string, any>
  [key: string]: any
}

export interface AdvancedSelectProps {
  // Core Props
  options?: SelectOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  size?: "sm" | "md" | "lg" | "xl"

  // Mode
  mode?: "single" | "multiple" | "tags"

  // Search & Filter
  searchable?: boolean
  searchPlaceholder?: string
  onSearch?: (search: string) => void
  filterOption?: (option: SelectOption, search: string) => boolean

  // Async & Loading
  loading?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  fetchOnMount?: boolean

  // Server-side
  serverSide?: boolean
  onServerSearch?: (search: string) => Promise<SelectOption[]>
  debounceTime?: number

  // Display
  maxTagCount?: number
  maxTagTextLength?: number
  showCount?: boolean
  showChips?: boolean
  allowClear?: boolean

  // Icons
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  removeIcon?: React.ReactNode

  // Empty State
  emptyText?: string
  notFoundContent?: React.ReactNode

  // Styling
  popoverClassName?: string
  triggerClassName?: string
  contentClassName?: string
  autoWidth?: boolean
  position?: "top" | "bottom" | "left" | "right"
  width?: string | number
  maxHeight?: string | number

  // Error Handling
  error?: string | boolean
  errorMessage?: string
  required?: boolean
  validateOnChange?: (value: string | string[]) => string | undefined

  // Create New Option
  allowCreate?: boolean
  createText?: string
  onCreateOption?: (inputValue: string) => SelectOption | Promise<SelectOption>
  onCreateClick?: (inputValue: string) => void
  createModalContent?: (inputValue: string, onConfirm: (option: SelectOption) => void) => React.ReactNode

  // Callbacks
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
  onDeselect?: (value: string) => void
  onDropdownVisibleChange?: (open: boolean) => void

  // Advanced
  virtualized?: boolean
  groupBy?: string
  sortOptions?: (a: SelectOption, b: SelectOption) => number
  renderOption?: (option: SelectOption) => React.ReactNode
  renderTrigger?: (selectedOptions: SelectOption[]) => React.ReactNode

  treeMode?: boolean
  treeCheckable?: boolean
  treeDefaultExpandAll?: boolean
  treeExpandedKeys?: string[]
  onTreeExpand?: (expandedKeys: string[]) => void
  showTreeLine?: boolean
  treeCheckStrictly?: boolean

  categories?: string[]
  categoryFilter?: boolean
  showCategoryTabs?: boolean
  onCategoryChange?: (category: string) => void

  maxSelection?: number
  minSelection?: number
  onMaxReached?: () => void
  beforeChange?: (value: string | string[], option: SelectOption) => boolean | Promise<boolean>
}

const sizeVariants = {
  sm: {
    trigger: "h-8 text-xs px-2",
    text: "text-xs",
    icon: "h-3 w-3",
    badge: "h-5 text-xs px-1.5",
    option: "py-1 px-2 text-xs",
  },
  md: {
    trigger: "h-10 text-sm px-3",
    text: "text-sm",
    icon: "h-4 w-4",
    badge: "h-6 text-sm px-2",
    option: "py-1.5 px-3 text-sm",
  },
  lg: {
    trigger: "h-12 text-base px-4",
    text: "text-base",
    icon: "h-5 w-5",
    badge: "h-7 text-base px-2.5",
    option: "py-2 px-4 text-base",
  },
  xl: {
    trigger: "h-14 text-lg px-5",
    text: "text-lg",
    icon: "h-6 w-6",
    badge: "h-8 text-lg px-3",
    option: "py-2.5 px-5 text-lg",
  },
}

export function CustomSelectOption({
  options: initialOptions = [],
  value,
  onChange,
  placeholder = "Select option...",
  disabled = false,
  className,
  size = "md",
  mode = "single",
  searchable = true,
  searchPlaceholder = "Search...",
  onSearch,
  filterOption,
  loading = false,
  onLoadMore,
  hasMore = false,
  fetchOnMount = false,
  serverSide = false,
  onServerSearch,
  debounceTime = 300,
  maxTagCount,
  maxTagTextLength = 20,
  showCount = false,
  showChips = true,
  allowClear = true,
  prefixIcon,
  suffixIcon,
  clearIcon,
  removeIcon,
  emptyText = "No results found",
  notFoundContent,
  popoverClassName,
  triggerClassName,
  contentClassName,
  autoWidth = false,
  position = "bottom",
  width,
  maxHeight = "300px",
  error,
  errorMessage,
  required = false,
  validateOnChange,
  allowCreate = false,
  createText = "Create",
  onCreateOption,
  onCreateClick,
  createModalContent,
  onFocus,
  onBlur,
  onClear,
  onDeselect,
  onDropdownVisibleChange,
  treeMode = false,
  treeCheckable = true,
  treeDefaultExpandAll = false,
  treeExpandedKeys: controlledExpandedKeys,
  onTreeExpand,
  showTreeLine = false,
  treeCheckStrictly = false,
  categories,
  categoryFilter = false,
  showCategoryTabs = false,
  onCategoryChange,
  virtualized = false,
  groupBy,
  sortOptions,
  renderOption,
  renderTrigger,
  maxSelection,
  minSelection,
  onMaxReached,
  beforeChange,
}: AdvancedSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [options, setOptions] = React.useState<SelectOption[]>(initialOptions)
  const [isLoading, setIsLoading] = React.useState(loading)
  const [isFetching, setIsFetching] = React.useState(false)
  const [internalError, setInternalError] = React.useState<string>("")
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>()
  const [expandedKeys, setExpandedKeys] = React.useState<string[]>(
    treeDefaultExpandAll ? getAllKeys(initialOptions) : [],
  )
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [createModalOpen, setCreateModalOpen] = React.useState(false)
  const [createValue, setCreateValue] = React.useState("")
  const [createLabel, setCreateLabel] = React.useState("")
  const [createDescription, setCreateDescription] = React.useState("")

  const observerTarget = React.useRef<HTMLDivElement>(null)
  const debounceTimer = React.useRef<NodeJS.Timeout>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [selectedOptionCache, setSelectedOptionCache] =
  React.useState<Map<string, SelectOption>>(new Map())


  function getAllKeys(opts: SelectOption[]): string[] {
    const keys: string[] = []
    const traverse = (options: SelectOption[]) => {
      options.forEach((opt) => {
        keys.push(opt.value)
        if (opt.children) {
          traverse(opt.children)
        }
      })
    }
    traverse(opts)
    return keys
  }

  const flattenedOptions = React.useMemo(() => {
    if (!treeMode) return options
    const flattened: SelectOption[] = []
    const flatten = (opts: SelectOption[], level = 0, parent?: string) => {
      opts.forEach((opt) => {
        flattened.push({ ...opt, level, parent })
        if (opt.children) {
          flatten(opt.children, level + 1, opt.value)
        }
      })
    }
    flatten(options)
    return flattened
  }, [options, treeMode])

  React.useEffect(() => {
    if (autoWidth && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [autoWidth, open])

  // Get selected values as array
  const selectedValues = React.useMemo(() => {
    if (mode === "single") {
      return value ? [value as string] : []
    }
    return (value as string[]) || []
  }, [value, mode])

  // Get selected options
const selectedOptions = React.useMemo(() => {
  const opts = treeMode ? flattenedOptions : options

  return selectedValues
    .map(
      (val) =>
        opts.find((o) => o.value === val) ||
        selectedOptionCache.get(val)
    )
    .filter(Boolean) as SelectOption[]
}, [options, flattenedOptions, selectedValues, treeMode, selectedOptionCache])


  const categoryFilteredOptions = React.useMemo(() => {
    if (!categoryFilter || !selectedCategory) return options

    const filterByCategory = (opts: SelectOption[]): SelectOption[] => {
      return opts
        .map((opt) => {
          if (opt.children) {
            const filteredChildren = filterByCategory(opt.children)
            if (filteredChildren.length > 0 || opt.category === selectedCategory) {
              return { ...opt, children: filteredChildren }
            }
            return null
          }
          return opt.category === selectedCategory ? opt : null
        })
        .filter((opt): opt is SelectOption => opt !== null)
    }

    return filterByCategory(options)
  }, [options, categoryFilter, selectedCategory])

  const groupedOptions = React.useMemo(() => {
    if (!groupBy) return null

    const opts = categoryFilter && selectedCategory ? categoryFilteredOptions : options
    const groups = new Map<string, SelectOption[]>()
    const addToGroup = (opt: SelectOption) => {
      const groupKey = opt[groupBy] || "Other"
      if (!groups.has(groupKey)) {
        groups.set(groupKey, [])
      }
      groups.get(groupKey)?.push(opt)
    }

    const traverse = (options: SelectOption[]) => {
      options.forEach((opt) => {
        addToGroup(opt)
        if (opt.children && !treeMode) {
          traverse(opt.children)
        }
      })
    }
    traverse(opts)
    return groups
  }, [options, categoryFilteredOptions, groupBy, categoryFilter, selectedCategory, treeMode])

  const sortedOptions = React.useMemo(() => {
    if (!sortOptions) return categoryFilter && selectedCategory ? categoryFilteredOptions : options
    const opts = categoryFilter && selectedCategory ? categoryFilteredOptions : options
    const sorted = [...opts].sort(sortOptions)
    return sorted
  }, [options, categoryFilteredOptions, sortOptions, categoryFilter, selectedCategory])

  const filteredOptions = React.useMemo(() => {
    const baseOptions = sortOptions
      ? sortedOptions
      : categoryFilter && selectedCategory
        ? categoryFilteredOptions
        : options
    if (!search || serverSide) return baseOptions

    if (filterOption) {
      const filterRecursive = (opts: SelectOption[]): SelectOption[] => {
        return opts
          .map((opt) => {
            const matches = filterOption(opt, search)
            if (opt.children) {
              const filteredChildren = filterRecursive(opt.children)
              if (matches || filteredChildren.length > 0) {
                return { ...opt, children: filteredChildren }
              }
              return null
            }
            return matches ? opt : null
          })
          .filter((opt): opt is SelectOption => opt !== null)
      }
      return filterRecursive(baseOptions)
    }

    const searchLower = search.toLowerCase()
    const defaultFilter = (opts: SelectOption[]): SelectOption[] => {
      return opts
        .map((opt) => {
          const matches =
            opt.label.toLowerCase().includes(searchLower) ||
            opt.value.toLowerCase().includes(searchLower) ||
            opt.description?.toLowerCase().includes(searchLower) ||
            opt.tags?.some((tag) => tag.toLowerCase().includes(searchLower))

          if (opt.children) {
            const filteredChildren = defaultFilter(opt.children)
            if (matches || filteredChildren.length > 0) {
              return { ...opt, children: filteredChildren }
            }
            return null
          }
          return matches ? opt : null
        })
        .filter((opt): opt is SelectOption => opt !== null)
    }
    return defaultFilter(baseOptions)
  }, [
    options,
    sortedOptions,
    categoryFilteredOptions,
    search,
    filterOption,
    serverSide,
    sortOptions,
    categoryFilter,
    selectedCategory,
  ])

  React.useEffect(() => {
    if (!serverSide || !onServerSearch || !search) {
      if (!search && !serverSide) {
        setOptions(initialOptions)
      }
      return
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

  debounceTimer.current = setTimeout(async () => {
  setIsFetching(true)
  setInternalError("")
  try {
    const results = await onServerSearch(search)

    // 🔥 Merge selected options so label never disappears
    const mergedOptions = [...results]

    selectedOptionCache.forEach((opt) => {
      if (!mergedOptions.some((o) => o.value === opt.value)) {
        mergedOptions.push(opt)
      }
    })

    setOptions(mergedOptions)
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Failed to fetch results"
    setInternalError(errorMsg)
  } finally {
    setIsFetching(false)
  }
}, debounceTime)
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [search, serverSide, onServerSearch, debounceTime, initialOptions])

  // Fetch on mount
  React.useEffect(() => {
    if (fetchOnMount && onServerSearch && !serverSide) {
      setIsLoading(true)
      setInternalError("")
      onServerSearch("")
        .then((results) => setOptions(results))
        .catch((error) => {
          const errorMsg = error instanceof Error ? error.message : "Failed to load options"
          setInternalError(errorMsg)
        })
        .finally(() => setIsLoading(false))
    }
  }, [fetchOnMount, onServerSearch, serverSide])

  // Lazy loading with Intersection Observer
  React.useEffect(() => {
    if (!onLoadMore || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          onLoadMore()
        }
      },
      { threshold: 1 },
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [onLoadMore, hasMore, isFetching])

  // Update options when initialOptions change
  React.useEffect(() => {
    if (!serverSide) {
      setOptions(initialOptions)
    }
  }, [initialOptions, serverSide])

  React.useEffect(() => {
    onDropdownVisibleChange?.(open)
  }, [open, onDropdownVisibleChange])

  const handleToggleExpand = (optionValue: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const newExpandedKeys = expandedKeys.includes(optionValue)
      ? expandedKeys.filter((k) => k !== optionValue)
      : [...expandedKeys, optionValue]

    if (controlledExpandedKeys === undefined) {
      setExpandedKeys(newExpandedKeys)
    }
    onTreeExpand?.(newExpandedKeys)
  }

  const actualExpandedKeys = controlledExpandedKeys ?? expandedKeys

  const handleSelect = async (optionValue: string) => {
    const option = flattenedOptions.find((o) => o.value === optionValue) || options.find((o) => o.value === optionValue)
    if (!option) return
    setSelectedOptionCache((prev) => {
  const map = new Map(prev)
  map.set(option.value, option)
  return map
})

    if (treeMode && option.children && option.children.length > 0 && !treeCheckable) {
      handleToggleExpand(optionValue)
      return
    }

    if (
      mode !== "single" &&
      maxSelection &&
      selectedValues.length >= maxSelection &&
      !selectedValues.includes(optionValue)
    ) {
      onMaxReached?.()
      return
    }

    if (beforeChange) {
      const canChange = await beforeChange(optionValue, option)
      if (!canChange) return
    }

    let newValue: string | string[]
    if (mode === "single") {
      newValue = optionValue
      setOpen(false)
    } else {
      newValue = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue]

      if (treeMode && !treeCheckStrictly && option.children) {
        const childValues = getAllChildValues(option)
        if (selectedValues.includes(optionValue)) {
          // Deselect all children
          newValue = (newValue as string[]).filter((v) => !childValues.includes(v))
        } else {
          // Select all children
          newValue = [...new Set([...(newValue as string[]), ...childValues])]
        }
      }
    }

    if (mode !== "single" && minSelection && (newValue as string[]).length < minSelection) {
      return
    }

    if (validateOnChange) {
      const validationError = validateOnChange(newValue)
      if (validationError) {
        setInternalError(validationError)
        return
      } else {
        setInternalError("")
      }
    }

    onChange?.(newValue)
  }

  const getAllChildValues = (option: SelectOption): string[] => {
    const values: string[] = [option.value]
    if (option.children) {
      option.children.forEach((child) => {
        values.push(...getAllChildValues(child))
      })
    }
    return values
  }

  const handleRemove = (optionValue: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (mode === "single") {
      onChange?.("")
    } else {
      const newValues = selectedValues.filter((v) => v !== optionValue)
      if (minSelection && newValues.length < minSelection) {
        return
      }
      onChange?.(newValues)
    }
    onDeselect?.(optionValue)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (minSelection && minSelection > 0) {
      return
    }
    onChange?.(mode === "single" ? "" : [])
    setInternalError("")
    onClear?.()
  }

  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue)
    onSearch?.(searchValue)
  }

  const handleCreateOption = async () => {
    if (!search.trim() || !allowCreate) return

    try {
      setIsLoading(true)
      setInternalError("")

      if (onCreateOption) {
        const newOption = await onCreateOption(search)
        setOptions([...options, newOption]);

        handleSelect(newOption.value)
        setSearch("")
      } else if (onCreateClick) {
        onCreateClick(search)
      } else {
        setCreateValue(search)
        setCreateLabel(search)
        setCreateModalOpen(true)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to create option"
      setInternalError(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateConfirm = () => {
 
    if (!createValue || !createLabel) return

    const newOption: SelectOption = {
      value: createValue,
      label: createLabel,
      description: createDescription || undefined,
    }

    setOptions([...options, newOption])

    handleSelect(newOption.value)
    setCreateModalOpen(false)
    setCreateValue("")
    setCreateLabel("")
    setCreateDescription("")
    setSearch("")
  }

  // Render selected display
  const renderSelectedDisplay = () => {
    if (renderTrigger) {
      return renderTrigger(selectedOptions)
    }

    if (selectedOptions.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>
    }

    if (mode === "single") {
      const selected = selectedOptions[0]
      return (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selected.icon && <span className="shrink-0">{selected.icon}</span>}
          <span className="truncate">{selected.label}</span>
        </div>
      )
    }

    // Multiple mode - show chips or count
    if (showCount && selectedOptions.length > 0) {
      return <span className="text-sm">{selectedOptions.length} selected</span>
    }

    if (!showChips) {
      return <span className="truncate">{selectedOptions.map((opt) => opt.label).join(", ")}</span>
    }

    // Show chips
    const displayCount = maxTagCount || selectedOptions.length
    const displayOptions = selectedOptions.slice(0, displayCount)
    const remainingCount = selectedOptions.length - displayCount

    return (
      <div className="flex items-center gap-1 flex-wrap flex-1 min-w-0">
        {displayOptions.map((opt) => (
          <Badge key={opt.value} variant="secondary" className="gap-1 pl-2 pr-1 py-0 h-6 max-w-37.5">
            {opt.icon && <span className="shrink-0 size-4">{opt.icon}</span>}
            <span className="truncate text-xs">
              {opt.label.length > maxTagTextLength ? `${opt.label.slice(0, maxTagTextLength)}...` : opt.label}
            </span>
            <button
              type="button"
              onClick={(e) => handleRemove(opt.value, e)}
              className="rounded-full hover:bg-muted-foreground/20 p-0.5 shrink-0"
            >
              {removeIcon || <X className="size-3" />}
            </button>
          </Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="secondary" className="px-2 py-0 h-6">
            +{remainingCount}
          </Badge>
        )}
      </div>
    )
  }

  const renderTreeOptions = (opts: SelectOption[], level = 0): React.ReactNode => {
    return opts.map((option) => {
      const isExpanded = actualExpandedKeys.includes(option.value)
      const hasChildren = option.children && option.children.length > 0
      const isSelected = selectedValues.includes(option.value)

      return (
        <React.Fragment key={option.value}>
          <CommandItem
            value={option.value}
            disabled={option.disabled}
            onSelect={() => handleSelect(option.value)}
            className="flex items-center gap-2 cursor-pointer"
            style={{ paddingLeft: `${level * 20 + 12}px` }}
          >
            {hasChildren && (
              <button
                type="button"
                onClick={(e) => handleToggleExpand(option.value, e)}
                className="shrink-0 hover:bg-muted rounded p-0.5"
              >
                <ChevronRight className={cn("size-3 transition-transform", isExpanded && "rotate-90")} />
              </button>
            )}
            {!hasChildren && showTreeLine && <span className="w-3 shrink-0" />}

            {treeCheckable && (
              <div
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                  isSelected ? "bg-primary text-primary-foreground" : "opacity-50",
                )}
              >
                {isSelected && <Check className="size-3" />}
              </div>
            )}

            {renderOption ? (
              renderOption(option)
            ) : (
              <>
                {option.icon && <span className="shrink-0">{option.icon}</span>}
                <div className="flex-1 min-w-0">
                  <div className="truncate">{option.label}</div>
                  {option.description && (
                    <div className="text-xs text-muted-foreground truncate">{option.description}</div>
                  )}
                </div>
              </>
            )}
          </CommandItem>

          {hasChildren && isExpanded && renderTreeOptions(option.children!, level + 1)}
        </React.Fragment>
      )
    })
  }

  const showLoading = isLoading || loading || isFetching
  const hasError = error || internalError
  const displayErrorMessage = typeof error === "string" ? error : errorMessage || internalError

  const sizeClasses = sizeVariants[size]

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={!!hasError}
            aria-required={required}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            style={width ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
            className={cn(
              "w-full justify-between font-normal",
              sizeClasses.trigger,
              error && "border-destructive focus-visible:ring-destructive",
              disabled && "cursor-not-allowed opacity-50",
              triggerClassName,
            )}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {prefixIcon && <span className={cn("shrink-0", sizeClasses.icon)}>{prefixIcon}</span>}

              {renderSelectedDisplay()}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {showLoading && <Loader2 className={cn("size-4 animate-spin", sizeClasses.icon)} />}
              {hasError && !showLoading && <AlertCircle className={cn("size-4 text-destructive", sizeClasses.icon)} />}
              {allowClear && selectedOptions.length > 0 && !disabled && !showLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={cn("rounded-sm hover:bg-muted p-0.5", sizeClasses.icon)}
                >
                  {clearIcon || <X className="size-3.5" />}
                </button>
              )}
              {suffixIcon || <ChevronDown className={cn("opacity-50", sizeClasses.icon)} />}
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className={cn("p-0", popoverClassName)}
          style={{
            width: autoWidth ? triggerWidth : undefined,
            maxHeight,
          }}
          align={position === "left" ? "start" : position === "right" ? "end" : "center"}
          side={position === "top" || position === "bottom" ? position : "bottom"}
        >
          <Command className={contentClassName} shouldFilter={false}>
            {searchable && (
              <CommandInput
                placeholder={searchPlaceholder}
                value={search}
                onValueChange={handleSearchChange}
                className={cn(sizeClasses.text)}
              />
            )}

            {showCategoryTabs && categories && categories.length > 0 && (
              <div className="border-b px-2 py-2">
                <Tabs
                  value={selectedCategory || "all"}
                  onValueChange={(val) => setSelectedCategory(val === "all" ? null : val)}
                >
                  <TabsList className="w-full justify-start h-auto">
                    <TabsTrigger value="all" className="text-xs">
                      All
                    </TabsTrigger>
                    {categories.map((cat) => (
                      <TabsTrigger key={cat} value={cat} className="text-xs">
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            )}

            <CommandList>
              <CommandEmpty>
                {notFoundContent || (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    {emptyText}
                    {allowCreate && search && (
                      <Button variant="ghost" size="sm" onClick={handleCreateOption} className="mt-2 w-full">
                        {createText} "{search}"
                      </Button>
                    )}
                  </div>
                )}
              </CommandEmpty>

              {treeMode ? (
                <CommandGroup>{renderTreeOptions(filteredOptions)}</CommandGroup>
              ) : groupedOptions ? (
                Array.from(groupedOptions.entries()).map(([groupName, groupOptions]) => (
                  <CommandGroup key={groupName} heading={groupName}>
                    {groupOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                        disabled={option.disabled}
                        className={cn("flex items-center gap-2 cursor-pointer", sizeClasses.option)}
                      >
                        <div
                          className={cn(
                            "flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                            selectedValues.includes(option.value) ? "bg-primary text-primary-foreground" : "opacity-50",
                          )}
                        >
                          {selectedValues.includes(option.value) && <Check className="size-3" />}
                        </div>

                        {renderOption ? (
                          renderOption(option)
                        ) : (
                          <>
                            {option.icon && <span className="shrink-0">{option.icon}</span>}
                            <div className="flex-1 min-w-0">
                              <div className="truncate">{option.label}</div>
                              {option.description && (
                                <div className="text-xs text-muted-foreground truncate">{option.description}</div>
                              )}
                            </div>
                          </>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              ) : (
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className={cn("flex items-center gap-2 cursor-pointer", sizeClasses.option)}
                    >
                      <div
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                          selectedValues.includes(option.value) ? "bg-primary text-primary-foreground" : "opacity-50",
                        )}
                      >
                        {selectedValues.includes(option.value) && <Check className="size-3" />}
                      </div>

                      {renderOption ? (
                        renderOption(option)
                      ) : (
                        <>
                          {option.icon && <span className="shrink-0">{option.icon}</span>}
                          <div className="flex-1 min-w-0">
                            <div className="truncate">{option.label}</div>
                            {option.description && (
                              <div className="text-xs text-muted-foreground truncate">{option.description}</div>
                            )}
                          </div>
                        </>
                      )}
                    </CommandItem>
                  ))}

                  {hasMore && (
                    <div ref={observerTarget} className="py-2 text-center">
                      <Loader2 className="size-4 animate-spin mx-auto text-muted-foreground" />
                    </div>
                  )}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {displayErrorMessage && (
        <div className="flex items-center gap-2 mt-1.5 text-xs text-destructive">
          <AlertCircle className="size-3 shrink-0" />
          <span>{displayErrorMessage}</span>
        </div>
      )}

      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Option</DialogTitle>
            <DialogDescription>Add a new option to the list</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value *</Label>
              <Input
                id="value"
                value={createValue}
                onChange={(e) => setCreateValue(e.target.value)}
                placeholder="unique-value"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Label *</Label>
              <Input
                id="label"
                value={createLabel}
                onChange={(e) => setCreateLabel(e.target.value)}
                placeholder="Display Label"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={createDescription}
                onChange={(e) => setCreateDescription(e.target.value)}
                placeholder="Optional description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateConfirm} disabled={!createValue || !createLabel}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
