"use client"

import { useState } from "react"
import { CustomSelectOption, type SelectOption } from "@/components/custom-ui/CustomSelectOption"
import { Card } from "@/components/ui/card"
import {
  User,
  Star,
  Mail,
  Tag,
  Globe,
  Heart,
  Code,
  Zap,
  Coffee,
  Folder,
  File,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  ShoppingCart,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


// Sample data
const simpleOptions: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
]

const iconOptions: SelectOption[] = [
  { value: "user", label: "User Profile", icon: <User className="size-4" /> },
  { value: "star", label: "Favorites", icon: <Star className="size-4" /> },
  { value: "mail", label: "Messages", icon: <Mail className="size-4" /> },
  { value: "tag", label: "Tags", icon: <Tag className="size-4" /> },
  { value: "globe", label: "Public", icon: <Globe className="size-4" /> },
]

const groupedOptions: SelectOption[] = [
  { value: "react", label: "React", group: "Frameworks", icon: <Code className="size-4" /> },
  { value: "vue", label: "Vue", group: "Frameworks", icon: <Code className="size-4" /> },
  { value: "angular", label: "Angular", group: "Frameworks", icon: <Code className="size-4" /> },
  { value: "typescript", label: "TypeScript", group: "Languages", icon: <Zap className="size-4" /> },
  { value: "javascript", label: "JavaScript", group: "Languages", icon: <Zap className="size-4" /> },
  { value: "python", label: "Python", group: "Languages", icon: <Zap className="size-4" /> },
  { value: "vscode", label: "VS Code", group: "Tools", icon: <Coffee className="size-4" /> },
  { value: "git", label: "Git", group: "Tools", icon: <Coffee className="size-4" /> },
]

const longOptions: SelectOption[] = Array.from({ length: 50 }, (_, i) => ({
  value: `option-${i}`,
  label: `Option ${i + 1}`,
  description: `This is the description for option ${i + 1}`,
}))

// Mock server-side search function
const mockServerSearch = async (search: string): Promise<SelectOption[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const allCountries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "India",
    "Brazil",
    "Mexico",
    "Spain",
    "Italy",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
  ]

  return allCountries
    .filter((country) => country.toLowerCase().includes(search.toLowerCase()))
    .map((country) => ({
      value: country.toLowerCase().replace(/\s+/g, "-"),
      label: country,
    }))
}

// Tree structure data for hierarchical select
const treeOptions: SelectOption[] = [
  {
    value: "documents",
    label: "Documents",
    icon: <Folder className="size-4 text-blue-500" />,
    children: [
      {
        value: "work",
        label: "Work",
        icon: <Folder className="size-4 text-blue-400" />,
        children: [
          { value: "report-q1", label: "Q1 Report.pdf", icon: <FileText className="size-4" /> },
          { value: "report-q2", label: "Q2 Report.pdf", icon: <FileText className="size-4" /> },
          { value: "budget", label: "Budget 2024.xlsx", icon: <File className="size-4" /> },
        ],
      },
      {
        value: "personal",
        label: "Personal",
        icon: <Folder className="size-4 text-blue-400" />,
        children: [
          { value: "resume", label: "Resume.pdf", icon: <FileText className="size-4" /> },
          { value: "passport", label: "Passport.jpg", icon: <ImageIcon className="size-4" /> },
        ],
      },
    ],
  },
  {
    value: "media",
    label: "Media",
    icon: <Folder className="size-4 text-purple-500" />,
    children: [
      { value: "photos", label: "Photos", icon: <ImageIcon className="size-4" />, description: "125 items" },
      { value: "videos", label: "Videos", icon: <Video className="size-4" />, description: "48 items" },
      { value: "music", label: "Music", icon: <Music className="size-4" />, description: "320 items" },
    ],
  },
  {
    value: "downloads",
    label: "Downloads",
    icon: <Folder className="size-4 text-green-500" />,
    children: [
      { value: "installer", label: "installer.exe", icon: <Archive className="size-4" /> },
      { value: "package", label: "package.zip", icon: <Archive className="size-4" /> },
    ],
  },
]

// Category-based options for e-commerce
const ecommerceOptions: SelectOption[] = [
  {
    value: "laptop-1",
    label: "MacBook Pro 16",
    category: "Electronics",
    tags: ["laptop", "apple", "premium"],
    icon: <ShoppingCart className="size-4" />,
    description: "$2,499.00",
  },
  {
    value: "phone-1",
    label: "iPhone 15 Pro",
    category: "Electronics",
    tags: ["phone", "apple", "5g"],
    icon: <ShoppingCart className="size-4" />,
    description: "$999.00",
  },
  {
    value: "tablet-1",
    label: "iPad Air",
    category: "Electronics",
    tags: ["tablet", "apple"],
    icon: <ShoppingCart className="size-4" />,
    description: "$599.00",
  },
  {
    value: "shirt-1",
    label: "Cotton T-Shirt",
    category: "Clothing",
    tags: ["shirt", "cotton", "casual"],
    icon: <Package className="size-4" />,
    description: "$29.99",
  },
  {
    value: "jeans-1",
    label: "Slim Fit Jeans",
    category: "Clothing",
    tags: ["jeans", "denim"],
    icon: <Package className="size-4" />,
    description: "$79.99",
  },
  {
    value: "jacket-1",
    label: "Leather Jacket",
    category: "Clothing",
    tags: ["jacket", "leather", "premium"],
    icon: <Package className="size-4" />,
    description: "$299.99",
  },
  {
    value: "book-1",
    label: "The Pragmatic Programmer",
    category: "Books",
    tags: ["programming", "tech"],
    icon: <FileText className="size-4" />,
    description: "$39.99",
  },
  {
    value: "book-2",
    label: "Clean Code",
    category: "Books",
    tags: ["programming", "software"],
    icon: <FileText className="size-4" />,
    description: "$44.99",
  },
]

const organizationTree: SelectOption[] = [
  {
    value: "ceo",
    label: "CEO - John Doe",
    icon: <User className="size-4 text-purple-500" />,
    children: [
      {
        value: "cto",
        label: "CTO - Jane Smith",
        icon: <User className="size-4 text-blue-500" />,
        children: [
          { value: "dev-lead", label: "Dev Lead - Mike Johnson", icon: <Code className="size-4" /> },
          { value: "qa-lead", label: "QA Lead - Sarah Williams", icon: <Code className="size-4" /> },
        ],
      },
      {
        value: "cfo",
        label: "CFO - Robert Brown",
        icon: <User className="size-4 text-green-500" />,
        children: [
          { value: "accountant-1", label: "Senior Accountant", icon: <User className="size-4" /> },
          { value: "accountant-2", label: "Junior Accountant", icon: <User className="size-4" /> },
        ],
      },
      {
        value: "cmo",
        label: "CMO - Emily Davis",
        icon: <User className="size-4 text-orange-500" />,
        children: [
          { value: "marketing-1", label: "Marketing Manager", icon: <Mail className="size-4" /> },
          { value: "marketing-2", label: "Social Media Manager", icon: <Globe className="size-4" /> },
        ],
      },
    ],
  },
]

export default function Index2() {
  const [singleValue, setSingleValue] = useState<string>("")
  const [multiValue, setMultiValue] = useState<string[]>([])
  const [serverValue, setServerValue] = useState<string>("")
  const [treeValue, setTreeValue] = useState<string[]>([])
  const [treeValueSingle, setTreeValueSingle] = useState<string>("")
  const [orgValue, setOrgValue] = useState<string[]>([])
  const [categoryValue, setCategoryValue] = useState<string[]>([])
  const [nestedValue, setNestedValue] = useState<string>("")
  const [maxSelectionValue, setMaxSelectionValue] = useState<string[]>([])
  const [minSelectionValue, setMinSelectionValue] = useState<string[]>(["apple", "banana"])

  const [lazyOptions, setLazyOptions] = useState<SelectOption[]>(longOptions.slice(0, 10))
  const [hasMore, setHasMore] = useState(true)
  const [createdOptions, setCreatedOptions] = useState<SelectOption[]>([...simpleOptions])
  const [errorValue, setErrorValue] = useState<string[]>([])

  const handleLoadMore = () => {
    setTimeout(() => {
      const currentLength = lazyOptions.length
      const nextOptions = longOptions.slice(currentLength, currentLength + 10)
      setLazyOptions([...lazyOptions, ...nextOptions])
      if (currentLength + 10 >= longOptions.length) {
        setHasMore(false)
      }
    }, 500)
  }

  const handleCreateOption = (inputValue: string): SelectOption => {
    const newOption: SelectOption = {
      value: inputValue.toLowerCase().replace(/\s+/g, "-"),
      label: inputValue,
      icon: <Heart className="size-4 text-red-500" />,
    }
    setCreatedOptions([...createdOptions, newOption])
    return newOption
  }

  const validateSelection = (value: string | string[]): string | undefined => {
    const values = Array.isArray(value) ? value : [value]
    if (values.length > 3) {
      return "You can only select up to 3 options"
    }
    return undefined
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-balance">Advanced Select Component</h1>
          <p className="text-muted-foreground text-pretty">
            A comprehensive select component with tree select, nested options, categories, search, and 100+ features.
            Try typing to search!
          </p>
          <div className="flex gap-2 pt-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/documentation">View Documentation</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/examples">100+ Examples</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Single Select */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Single Select</h2>
              <p className="text-sm text-muted-foreground">
                Basic single selection with search - Type to search options
              </p>
            </div>
            <CustomSelectOption
              options={simpleOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
              placeholder="Select a fruit"
              searchable
            />
            <p className="text-xs text-muted-foreground">
              Selected: <span className="font-mono">{singleValue || "none"}</span>
            </p>
          </Card>

          {/* Tree Select - Multiple Selection */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Tree Select - File System</h2>
              <p className="text-sm text-muted-foreground">
                Hierarchical selection with expand/collapse. Select folders to auto-select children
              </p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={treeOptions}
              value={treeValue}
              onChange={(val) => setTreeValue(val as string[])}
              placeholder="Select files and folders"
              treeMode
              treeCheckable
              treeDefaultExpandAll
              showChips
              maxTagCount={3}
              searchable
            />
            <p className="text-xs text-muted-foreground">
              Selected ({treeValue.length}): <span className="font-mono">{treeValue.join(", ") || "none"}</span>
            </p>
          </Card>

          {/* Tree Select - Single Selection */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Tree Select - Single Mode</h2>
              <p className="text-sm text-muted-foreground">Click folders to expand, click files to select</p>
            </div>
            <CustomSelectOption
              mode="single"
              options={treeOptions}
              value={treeValueSingle}
              onChange={(val) => setTreeValueSingle(val as string)}
              placeholder="Select a file"
              treeMode
              treeCheckable={false}
              showTreeLine
              searchable
            />
            <p className="text-xs text-muted-foreground">
              Selected: <span className="font-mono">{treeValueSingle || "none"}</span>
            </p>
          </Card>

          {/* Organization Tree */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Tree Select - Organization Structure</h2>
              <p className="text-sm text-muted-foreground">
                Nested organizational hierarchy with parent-child relationships
              </p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={organizationTree}
              value={orgValue}
              onChange={(val) => setOrgValue(val as string[])}
              placeholder="Select team members"
              treeMode
              treeCheckable
              showChips
              maxTagCount={2}
              searchable
            />
            <p className="text-xs text-muted-foreground">
              Selected: <span className="font-mono">{orgValue.join(", ") || "none"}</span>
            </p>
          </Card>

          {/* Category Filtering with Tabs */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Category Filtering - E-commerce Products</h2>
              <p className="text-sm text-muted-foreground">
                Filter options by category using tabs. Search also works across categories
              </p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={ecommerceOptions}
              value={categoryValue}
              onChange={(val) => setCategoryValue(val as string[])}
              placeholder="Select products"
              categories={["Electronics", "Clothing", "Books"]}
              categoryFilter
              showCategoryTabs
              showChips
              maxTagCount={4}
              searchable
            />
            <p className="text-xs text-muted-foreground">
              Selected: <span className="font-mono">{categoryValue.join(", ") || "none"}</span>
            </p>
          </Card>

          {/* Max Selection Limit */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Max Selection Limit</h2>
              <p className="text-sm text-muted-foreground">Maximum 3 selections allowed - try selecting more</p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={simpleOptions}
              value={maxSelectionValue}
              onChange={(val) => setMaxSelectionValue(val as string[])}
              placeholder="Select up to 3 options"
              maxSelection={3}
              onMaxReached={() => alert("Maximum 3 selections allowed!")}
              showChips
              searchable
            />
            <p className="text-xs text-muted-foreground">Selected: {maxSelectionValue.length}/3</p>
          </Card>

          {/* Min Selection Requirement */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Min Selection Requirement</h2>
              <p className="text-sm text-muted-foreground">
                At least 2 options must be selected - cannot remove below minimum
              </p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={simpleOptions}
              value={minSelectionValue}
              onChange={(val) => setMinSelectionValue(val as string[])}
              placeholder="Must select at least 2"
              minSelection={2}
              showChips
              searchable
            />
            <p className="text-xs text-muted-foreground">Selected: {minSelectionValue.length} (min: 2)</p>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Error Handling & Validation</h2>
              <p className="text-sm text-muted-foreground">Try selecting more than 3 options to see validation error</p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={simpleOptions}
              value={errorValue}
              onChange={(val) => setErrorValue(val as string[])}
              placeholder="Select up to 3 options"
              validateOnChange={validateSelection}
              required
              searchable
            />
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Auto-Width Dropdown</h2>
              <p className="text-sm text-muted-foreground">Dropdown width matches trigger width automatically</p>
            </div>
            <div className="max-w-xs">
              <CustomSelectOption
                options={simpleOptions}
                value={singleValue}
                onChange={(val) => setSingleValue(val as string)}
                placeholder="Select a fruit"
                autoWidth
                searchable
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Create New Option with Modal</h2>
              <p className="text-sm text-muted-foreground">
                Type a new value and create it with a modal dialog to add details
              </p>
            </div>
            <CustomSelectOption
              options={createdOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
              placeholder="Type to create new option"
              allowCreate
              onCreateOption={handleCreateOption}
              searchable
            />
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Grouped Options</h2>
              <p className="text-sm text-muted-foreground">Options organized into groups</p>
            </div>
            <CustomSelectOption
              options={groupedOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
              placeholder="Select technology"
              groupBy="group"
              searchable
            />
          </Card>

          {/* Multiple Select with Chips */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Multiple Select (Chips)</h2>
              <p className="text-sm text-muted-foreground">Select multiple options with chip display</p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={iconOptions}
              value={multiValue}
              onChange={(val) => setMultiValue(val as string[])}
              placeholder="Select multiple options"
              showChips
              maxTagCount={3}
              searchable
            />
            <p className="text-xs text-muted-foreground">
              Selected: <span className="font-mono">{multiValue.join(", ") || "none"}</span>
            </p>
          </Card>

          {/* Multiple with Count */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Multiple Select (Count Display)</h2>
              <p className="text-sm text-muted-foreground">Show selected count instead of chips</p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={simpleOptions}
              value={multiValue}
              onChange={(val) => setMultiValue(val as string[])}
              placeholder="Select multiple options"
              showCount
              prefixIcon={<Tag className="size-4" />}
              searchable
            />
          </Card>

          {/* Lazy Loading */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Lazy Loading with Infinite Scroll</h2>
              <p className="text-sm text-muted-foreground">Scroll to bottom to load more options</p>
            </div>
            <CustomSelectOption
              options={lazyOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
              placeholder="Select an option"
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              searchable
            />
          </Card>

          {/* Server-side Search */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Server-side Search with Debouncing</h2>
              <p className="text-sm text-muted-foreground">
                Type to search countries - Results fetched from server with 500ms delay
              </p>
            </div>
            <CustomSelectOption
              options={[]}
              value={serverValue}
              onChange={(val) => setServerValue(val as string)}
              placeholder="Search countries..."
              serverSide
              onServerSearch={mockServerSearch}
              debounceTime={500}
              searchable
            />
            <p className="text-xs text-muted-foreground">
              Selected: <span className="font-mono">{serverValue || "none"}</span>
            </p>
          </Card>

          {/* Custom Styling */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Custom Styling</h2>
              <p className="text-sm text-muted-foreground">With prefix icon, custom classes, and positioning</p>
            </div>
            <CustomSelectOption
              options={iconOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
              placeholder="Custom styled select"
              prefixIcon={<Star className="size-4 text-yellow-500" />}
              className="border-2 border-primary"
              position="top"
              searchable
            />
          </Card>

          {/* Disabled State */}
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Disabled State</h2>
              <p className="text-sm text-muted-foreground">Select component in disabled state</p>
            </div>
            <CustomSelectOption options={simpleOptions} value="apple" disabled placeholder="Disabled select" searchable />
          </Card>
        </div>

        {/* Features List */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">All Features</h2>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-2">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Single & Multiple & Tags Mode</li>
              <li>Tree Select (Hierarchical)</li>
              <li>Nested Options</li>
              <li>Category Filtering with Tabs</li>
              <li>Searchable with Custom Filter</li>
              <li>Lazy Loading (Infinite Scroll)</li>
              <li>Server-side Search with Debouncing</li>
              <li>Chip & Count Display</li>
              <li>Custom Icons (Prefix/Suffix)</li>
              <li>Loading States</li>
              <li>Empty States</li>
              <li>Error Handling & Validation</li>
            </ul>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Create New Options with Modal</li>
              <li>Auto-Width Dropdown</li>
              <li>Custom Positioning (Top/Bottom/Left/Right)</li>
              <li>Grouped Options</li>
              <li>Sort Options</li>
              <li>Custom Rendering</li>
              <li>Max & Min Selection Limits</li>
              <li>Max Tag Count & Text Length</li>
              <li>Option Descriptions</li>
              <li>Disabled Options</li>
              <li>Clear Functionality</li>
              <li>Tag/Label Search</li>
            </ul>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Tree Expand/Collapse</li>
              <li>Tree Line Connections</li>
              <li>Parent-Child Selection</li>
              <li>Before Change Hook</li>
              <li>Callbacks (Focus/Blur/Change/Deselect)</li>
              <li>Keyboard Navigation</li>
              <li>Accessibility (ARIA)</li>
              <li>Custom Width & Height</li>
              <li>Required Field Support</li>
              <li>Metadata & Custom Fields</li>
              <li>TypeScript Support</li>
              <li>100+ Usage Examples</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
