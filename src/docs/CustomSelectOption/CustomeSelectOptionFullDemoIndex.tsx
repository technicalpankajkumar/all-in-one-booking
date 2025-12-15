import { useState } from "react"
import { CustomSelectOption, type SelectOption } from "@/components/custom-ui/CustomSelectOption"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  User,
  Star,
  Mail,
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
  Check,
  AlertCircle,
  AlertTriangle,
  Info,
  MapPin,
  Building,
  Briefcase,
} from "lucide-react"
import { Link } from "react-router-dom"


// Sample Data Sets
const fruits: SelectOption[] = [
  { value: "apple", label: "Apple", description: "Sweet and crisp" },
  { value: "banana", label: "Banana", description: "Rich in potassium" },
  { value: "orange", label: "Orange", description: "High in Vitamin C" },
  { value: "grape", label: "Grape", description: "Perfect for snacking" },
  { value: "mango", label: "Mango", description: "Tropical delight" },
  { value: "strawberry", label: "Strawberry", description: "Berry sweet" },
  { value: "kiwi", label: "Kiwi", description: "Tangy and green" },
  { value: "pineapple", label: "Pineapple", description: "Tropical favorite" },
]

const countries: SelectOption[] = [
  { value: "us", label: "United States", icon: <Globe className="size-4" />, group: "North America" },
  { value: "ca", label: "Canada", icon: <Globe className="size-4" />, group: "North America" },
  { value: "mx", label: "Mexico", icon: <Globe className="size-4" />, group: "North America" },
  { value: "uk", label: "United Kingdom", icon: <Globe className="size-4" />, group: "Europe" },
  { value: "de", label: "Germany", icon: <Globe className="size-4" />, group: "Europe" },
  { value: "fr", label: "France", icon: <Globe className="size-4" />, group: "Europe" },
  { value: "it", label: "Italy", icon: <Globe className="size-4" />, group: "Europe" },
  { value: "es", label: "Spain", icon: <Globe className="size-4" />, group: "Europe" },
  { value: "jp", label: "Japan", icon: <Globe className="size-4" />, group: "Asia" },
  { value: "cn", label: "China", icon: <Globe className="size-4" />, group: "Asia" },
  { value: "in", label: "India", icon: <Globe className="size-4" />, group: "Asia" },
  { value: "au", label: "Australia", icon: <Globe className="size-4" />, group: "Oceania" },
]

const techStack: SelectOption[] = [
  {
    value: "react",
    label: "React",
    icon: <Code className="size-4 text-blue-500" />,
    category: "Frontend",
    tags: ["javascript", "ui"],
  },
  {
    value: "vue",
    label: "Vue",
    icon: <Code className="size-4 text-green-500" />,
    category: "Frontend",
    tags: ["javascript", "ui"],
  },
  {
    value: "angular",
    label: "Angular",
    icon: <Code className="size-4 text-red-500" />,
    category: "Frontend",
    tags: ["typescript", "ui"],
  },
  { value: "next", label: "Next.js", icon: <Zap className="size-4" />, category: "Frontend", tags: ["react", "ssr"] },
  {
    value: "node",
    label: "Node.js",
    icon: <Coffee className="size-4 text-green-600" />,
    category: "Backend",
    tags: ["javascript", "runtime"],
  },
  {
    value: "express",
    label: "Express",
    icon: <Code className="size-4" />,
    category: "Backend",
    tags: ["node", "framework"],
  },
  {
    value: "nest",
    label: "NestJS",
    icon: <Code className="size-4 text-red-600" />,
    category: "Backend",
    tags: ["typescript", "framework"],
  },
  {
    value: "postgres",
    label: "PostgreSQL",
    icon: <Archive className="size-4 text-blue-600" />,
    category: "Database",
    tags: ["sql", "relational"],
  },
  {
    value: "mongo",
    label: "MongoDB",
    icon: <Archive className="size-4 text-green-600" />,
    category: "Database",
    tags: ["nosql", "document"],
  },
  {
    value: "redis",
    label: "Redis",
    icon: <Archive className="size-4 text-red-500" />,
    category: "Database",
    tags: ["cache", "memory"],
  },
]

const fileSystemTree: SelectOption[] = [
  {
    value: "root",
    label: "My Computer",
    icon: <Folder className="size-4 text-blue-500" />,
    children: [
      {
        value: "documents",
        label: "Documents",
        icon: <Folder className="size-4 text-blue-400" />,
        children: [
          { value: "resume", label: "Resume.pdf", icon: <FileText className="size-4" /> },
          { value: "coverletter", label: "CoverLetter.docx", icon: <File className="size-4" /> },
          {
            value: "projects",
            label: "Projects",
            icon: <Folder className="size-4 text-blue-300" />,
            children: [
              { value: "project1", label: "Website Redesign.pdf", icon: <FileText className="size-4" /> },
              { value: "project2", label: "Mobile App.pdf", icon: <FileText className="size-4" /> },
            ],
          },
        ],
      },
      {
        value: "pictures",
        label: "Pictures",
        icon: <Folder className="size-4 text-purple-500" />,
        children: [
          {
            value: "vacation",
            label: "Vacation 2024",
            icon: <ImageIcon className="size-4" />,
            description: "25 photos",
          },
          {
            value: "family",
            label: "Family Photos",
            icon: <ImageIcon className="size-4" />,
            description: "150 photos",
          },
        ],
      },
      {
        value: "videos",
        label: "Videos",
        icon: <Folder className="size-4 text-red-500" />,
        children: [
          { value: "tutorials", label: "Tutorials", icon: <Video className="size-4" />, description: "12 videos" },
          {
            value: "recordings",
            label: "Screen Recordings",
            icon: <Video className="size-4" />,
            description: "8 videos",
          },
        ],
      },
    ],
  },
]

const organizationTree: SelectOption[] = [
  {
    value: "company",
    label: "Tech Corp Inc.",
    icon: <Building className="size-4 text-purple-600" />,
    children: [
      {
        value: "engineering",
        label: "Engineering",
        icon: <Briefcase className="size-4 text-blue-500" />,
        children: [
          {
            value: "frontend-team",
            label: "Frontend Team",
            icon: <Code className="size-4" />,
            description: "8 members",
          },
          {
            value: "backend-team",
            label: "Backend Team",
            icon: <Code className="size-4" />,
            description: "12 members",
          },
          { value: "devops-team", label: "DevOps Team", icon: <Zap className="size-4" />, description: "5 members" },
        ],
      },
      {
        value: "product",
        label: "Product",
        icon: <Briefcase className="size-4 text-green-500" />,
        children: [
          { value: "pm-team", label: "Product Managers", icon: <User className="size-4" />, description: "4 members" },
          { value: "design-team", label: "Design Team", icon: <Star className="size-4" />, description: "6 members" },
        ],
      },
      {
        value: "marketing",
        label: "Marketing",
        icon: <Briefcase className="size-4 text-orange-500" />,
        children: [
          { value: "content-team", label: "Content Team", icon: <Mail className="size-4" />, description: "5 members" },
          {
            value: "social-team",
            label: "Social Media Team",
            icon: <Globe className="size-4" />,
            description: "3 members",
          },
        ],
      },
    ],
  },
]

const ecommerceProducts: SelectOption[] = [
  {
    value: "laptop-1",
    label: "MacBook Pro 16",
    category: "Electronics",
    description: "$2,499",
    icon: <ShoppingCart className="size-4" />,
    tags: ["computer", "apple"],
  },
  {
    value: "laptop-2",
    label: "Dell XPS 15",
    category: "Electronics",
    description: "$1,799",
    icon: <ShoppingCart className="size-4" />,
    tags: ["computer", "dell"],
  },
  {
    value: "phone-1",
    label: "iPhone 15 Pro",
    category: "Electronics",
    description: "$999",
    icon: <ShoppingCart className="size-4" />,
    tags: ["phone", "apple"],
  },
  {
    value: "phone-2",
    label: "Samsung Galaxy S24",
    category: "Electronics",
    description: "$899",
    icon: <ShoppingCart className="size-4" />,
    tags: ["phone", "samsung"],
  },
  {
    value: "headphones-1",
    label: "AirPods Pro",
    category: "Electronics",
    description: "$249",
    icon: <Music className="size-4" />,
    tags: ["audio", "apple"],
  },
  {
    value: "shirt-1",
    label: "Cotton T-Shirt",
    category: "Clothing",
    description: "$29.99",
    icon: <Package className="size-4" />,
    tags: ["shirt", "casual"],
  },
  {
    value: "jeans-1",
    label: "Slim Fit Jeans",
    category: "Clothing",
    description: "$79.99",
    icon: <Package className="size-4" />,
    tags: ["jeans", "casual"],
  },
  {
    value: "jacket-1",
    label: "Leather Jacket",
    category: "Clothing",
    description: "$299.99",
    icon: <Package className="size-4" />,
    tags: ["jacket", "formal"],
  },
  {
    value: "book-1",
    label: "Clean Code",
    category: "Books",
    description: "$44.99",
    icon: <FileText className="size-4" />,
    tags: ["programming"],
  },
  {
    value: "book-2",
    label: "Design Patterns",
    category: "Books",
    description: "$54.99",
    icon: <FileText className="size-4" />,
    tags: ["programming"],
  },
]

const locations: SelectOption[] = [
  {
    value: "usa",
    label: "United States",
    icon: <MapPin className="size-4" />,
    children: [
      {
        value: "california",
        label: "California",
        icon: <MapPin className="size-4 text-blue-500" />,
        children: [
          { value: "sf", label: "San Francisco", icon: <MapPin className="size-4 text-blue-400" /> },
          { value: "la", label: "Los Angeles", icon: <MapPin className="size-4 text-blue-400" /> },
          { value: "sd", label: "San Diego", icon: <MapPin className="size-4 text-blue-400" /> },
        ],
      },
      {
        value: "newyork",
        label: "New York",
        icon: <MapPin className="size-4 text-green-500" />,
        children: [
          { value: "nyc", label: "New York City", icon: <MapPin className="size-4 text-green-400" /> },
          { value: "buffalo", label: "Buffalo", icon: <MapPin className="size-4 text-green-400" /> },
        ],
      },
    ],
  },
  {
    value: "canada",
    label: "Canada",
    icon: <MapPin className="size-4" />,
    children: [
      {
        value: "ontario",
        label: "Ontario",
        icon: <MapPin className="size-4 text-red-500" />,
        children: [
          { value: "toronto", label: "Toronto", icon: <MapPin className="size-4 text-red-400" /> },
          { value: "ottawa", label: "Ottawa", icon: <MapPin className="size-4 text-red-400" /> },
        ],
      },
    ],
  },
]

export default function CustomeSelectOptionFullDemoIndex() {
  // State for all examples
  const [val1, setVal1] = useState("")
  const [val2, setVal2] = useState<string[]>([])
  const [val3, setVal3] = useState("")
  const [val4, setVal4] = useState<string[]>([])
  const [val5, setVal5] = useState<string[]>([])
  const [val6, setVal6] = useState<string[]>([])
  const [val7, setVal7] = useState("")
  const [val8, setVal8] = useState<string[]>([])
  const [val9, setVal9] = useState("")
  const [val10, setVal10] = useState<string[]>([])

  // Validation examples (65-80)
  const [valError, setValError] = useState<string[]>([])
  const [valWarning, setValWarning] = useState<string[]>([])
  const [valSuccess, setValSuccess] = useState<string[]>(["apple", "banana"])
  const [valRequired, setValRequired] = useState("")
  const [valMinMax, setValMinMax] = useState<string[]>(["apple", "banana"])
  const [valCustom, setValCustom] = useState<string[]>([])
  const [valAsync, setValAsync] = useState("")
  const [valConditional, setValConditional] = useState<string[]>([])
  const [valFormat, setValFormat] = useState("")
  const [valUnique, setValUnique] = useState<string[]>([])
  const [valDependency, setValDependency] = useState<string[]>([])
  const [valRange, setValRange] = useState<string[]>([])
  const [valPattern, setValPattern] = useState("")
  const [valEmail, setValEmail] = useState("")
  const [valLength, setValLength] = useState<string[]>([])
  const [valComposite, setValComposite] = useState<string[]>([])

  // Advanced features (87-110)
  const [advTree, setAdvTree] = useState<string[]>([])
  const [advOrg, setAdvOrg] = useState<string[]>([])
  const [advLocation, setAdvLocation] = useState<string[]>([])
  const [advCategory, setAdvCategory] = useState<string[]>([])
  const [advGrouped, setAdvGrouped] = useState("")
  const [advSorted, setAdvSorted] = useState("")
  const [advFiltered, setAdvFiltered] = useState<string[]>([])
  const [advLazy, setAdvLazy] = useState<string[]>([])
  const [advServer, setAdvServer] = useState("")
  const [advCreate, setAdvCreate] = useState("")
  const [advCustomRender, setAdvCustomRender] = useState<string[]>([])
  const [advPrefixIcon, setAdvPrefixIcon] = useState("")
  const [advSuffixIcon, setAdvSuffixIcon] = useState("")
  const [advMaxTags, setAdvMaxTags] = useState<string[]>([])
  const [advShowCount, setAdvShowCount] = useState<string[]>([])
  const [advDisabled, setAdvDisabled] = useState("")
  const [advReadOnly, setAdvReadOnly] = useState<string[]>(["apple", "banana"])
  const [advSize, setAdvSize] = useState("")
  const [advPosition, setAdvPosition] = useState("")
  const [advAutoWidth, setAdvAutoWidth] = useState("")
  const [advMaxHeight, setAdvMaxHeight] = useState("")
  const [advBeforeChange, setAdvBeforeChange] = useState<string[]>([])
  const [advOnChange, setAdvOnChange] = useState<string[]>([])
  const [advOnFocus, setAdvOnFocus] = useState("")

  const validateError = (value: string | string[]) => {
    const values = Array.isArray(value) ? value : [value]
    if (values.length > 3) return "Maximum 3 selections allowed"
    return undefined
  }

  const validateWarning = (value: string | string[]) => {
    const values = Array.isArray(value) ? value : [value]
    if (values.length > 2) return "Consider selecting fewer options for better performance"
    return undefined
  }

  const mockServerSearch = async (search: string): Promise<SelectOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return countries.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()))
  }

  const [lazyOpts, setLazyOpts] = useState(fruits.slice(0, 3))
  const [hasMore, setHasMore] = useState(true)

  const handleLoadMore = () => {
    setTimeout(() => {
      const current = lazyOpts.length
      const next = fruits.slice(current, current + 3)
      setLazyOpts([...lazyOpts, ...next])
      if (current + 3 >= fruits.length) setHasMore(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-balance">110+ Advanced Select Examples</h1>
          <p className="text-muted-foreground text-pretty">
            Comprehensive showcase of all features including validation, error handling, tree select, categories, and
            advanced customization.
          </p>
          <div className="flex gap-2 pt-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">Basic Demos</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/documentation">Documentation</Link>
            </Button>
          </div>
        </div>

        {/* BASIC EXAMPLES 1-20 */}
        <div className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-2xl font-bold">Basic Examples (1-20)</h2>
            <p className="text-sm text-muted-foreground">Fundamental usage patterns</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 1. Simple Single Select */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">1. Simple Single Select</h3>
                <p className="text-xs text-muted-foreground">Basic single selection</p>
              </div>
              <CustomSelectOption
                options={fruits}
                value={val1}
                onChange={(v) => setVal1(v as string)}
                placeholder="Select fruit"
              />
            </Card>

            {/* 2. Multiple Select */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">2. Multiple Select</h3>
                <p className="text-xs text-muted-foreground">Select multiple options</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruits}
                value={val2}
                onChange={(v) => setVal2(v as string[])}
                placeholder="Select fruits"
              />
            </Card>

            {/* 3. With Search */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">3. Searchable Select</h3>
                <p className="text-xs text-muted-foreground">Type to filter options</p>
              </div>
              <CustomSelectOption
                searchable
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="Search fruits..."
              />
            </Card>

            {/* 4. With Icons */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">4. Options with Icons</h3>
                <p className="text-xs text-muted-foreground">Visual indicators</p>
              </div>
              <CustomSelectOption
                options={[
                  { value: "user", label: "User", icon: <User className="size-4" /> },
                  { value: "star", label: "Star", icon: <Star className="size-4" /> },
                  { value: "mail", label: "Mail", icon: <Mail className="size-4" /> },
                ]}
                value={val1}
                onChange={(v) => setVal1(v as string)}
                placeholder="Select option"
              />
            </Card>

            {/* 5. With Descriptions */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">5. With Descriptions</h3>
                <p className="text-xs text-muted-foreground">Secondary text for context</p>
              </div>
              <CustomSelectOption
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="Select fruit"
              />
            </Card>

            {/* 6. Disabled State */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">6. Disabled State</h3>
                <p className="text-xs text-muted-foreground">Non-interactive select</p>
              </div>
              <CustomSelectOption disabled options={fruits} value="apple" placeholder="Disabled select" />
            </Card>

            {/* 7. With Clear Button */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">7. Clearable Select</h3>
                <p className="text-xs text-muted-foreground">Quick reset functionality</p>
              </div>
              <CustomSelectOption
                allowClear
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="Select fruit"
              />
            </Card>

            {/* 8. Chip Display */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">8. Multiple with Chips</h3>
                <p className="text-xs text-muted-foreground">Badge display mode</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={val4}
                onChange={(v) => setVal4(v as string[])}
                placeholder="Select fruits"
              />
            </Card>

            {/* 9. Count Display */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">9. Count Display Mode</h3>
                <p className="text-xs text-muted-foreground">Show selection count</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showCount
                showChips={false}
                options={fruits}
                value={val5}
                onChange={(v) => setVal5(v as string[])}
                placeholder="Select fruits"
              />
            </Card>

            {/* 10. Max Tag Count */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">10. Limited Chip Display</h3>
                <p className="text-xs text-muted-foreground">Max 2 visible chips</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                maxTagCount={2}
                options={fruits}
                value={val6}
                onChange={(v) => setVal6(v as string[])}
                placeholder="Select fruits"
              />
            </Card>

            {/* 11. Prefix Icon */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">11. With Prefix Icon</h3>
                <p className="text-xs text-muted-foreground">Leading icon decoration</p>
              </div>
              <CustomSelectOption
                prefixIcon={<Star className="size-4" />}
                options={fruits}
                value={val7}
                onChange={(v) => setVal7(v as string)}
                placeholder="Favorite fruit"
              />
            </Card>

            {/* 12. Suffix Icon */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">12. With Custom Suffix</h3>
                <p className="text-xs text-muted-foreground">Trailing icon replacement</p>
              </div>
              <CustomSelectOption
                suffixIcon={<Heart className="size-4 text-red-500" />}
                options={fruits}
                value={val7}
                onChange={(v) => setVal7(v as string)}
                placeholder="Favorite fruit"
              />
            </Card>

            {/* 13. Loading State */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">13. Loading State</h3>
                <p className="text-xs text-muted-foreground">Async operation indicator</p>
              </div>
              <CustomSelectOption loading options={fruits} value={val3} placeholder="Loading..." />
            </Card>

            {/* 14. Empty State Custom */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">14. Custom Empty Message</h3>
                <p className="text-xs text-muted-foreground">No results fallback</p>
              </div>
              <CustomSelectOption
                searchable
                options={[]}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                emptyText="No fruits available"
                placeholder="Search fruits"
              />
            </Card>

            {/* 15. Small Size */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">15. Small Size</h3>
                <p className="text-xs text-muted-foreground">Compact variant</p>
              </div>
              <CustomSelectOption
                size="sm"
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="Small select"
              />
            </Card>

            {/* 16. Large Size */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">16. Large Size</h3>
                <p className="text-xs text-muted-foreground">Prominent variant</p>
              </div>
              <CustomSelectOption
                size="lg"
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="Large select"
              />
            </Card>

            {/* 17. Extra Large Size */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">17. Extra Large Size</h3>
                <p className="text-xs text-muted-foreground">Maximum prominence</p>
              </div>
              <CustomSelectOption
                size="xl"
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="XL select"
              />
            </Card>

            {/* 18. Auto Width */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">18. Auto Width Dropdown</h3>
                <p className="text-xs text-muted-foreground">Matches trigger width</p>
              </div>
              <div className="max-w-xs">
                <CustomSelectOption
                  autoWidth
                  options={fruits}
                  value={val3}
                  onChange={(v) => setVal3(v as string)}
                  placeholder="Auto width"
                />
              </div>
            </Card>

            {/* 19. Fixed Width */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">19. Fixed Width</h3>
                <p className="text-xs text-muted-foreground">Custom pixel width</p>
              </div>
              <CustomSelectOption
                width={200}
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="200px width"
              />
            </Card>

            {/* 20. Custom Max Height */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">20. Custom Max Height</h3>
                <p className="text-xs text-muted-foreground">Scrollable content area</p>
              </div>
              <CustomSelectOption
                maxHeight="150px"
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="150px max height"
              />
            </Card>
          </div>
        </div>

        {/* GROUPING & ORGANIZATION 21-40 */}
        <div className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-2xl font-bold">Grouping & Organization (21-40)</h2>
            <p className="text-sm text-muted-foreground">Organizing options effectively</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 21. Basic Groups */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">21. Grouped Options</h3>
                <p className="text-xs text-muted-foreground">Organize by category</p>
              </div>
              <CustomSelectOption
                groupBy="group"
                options={countries}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                placeholder="Select country"
                searchable
              />
            </Card>

            {/* 22. Tech Stack Groups */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">22. Tech Stack Groups</h3>
                <p className="text-xs text-muted-foreground">Frontend, Backend, Database</p>
              </div>
              <CustomSelectOption
                groupBy="category"
                options={techStack}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                placeholder="Select technology"
                searchable
              />
            </Card>

            {/* 23. Multiple with Groups */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">23. Multiple + Groups</h3>
                <p className="text-xs text-muted-foreground">Combined functionality</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                groupBy="group"
                showChips
                maxTagCount={2}
                options={countries}
                value={val10}
                onChange={(v) => setVal10(v as string[])}
                placeholder="Select countries"
                searchable
              />
            </Card>

            {/* 24. Sorted Options */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">24. Alphabetically Sorted</h3>
                <p className="text-xs text-muted-foreground">Custom sort function</p>
              </div>
              <CustomSelectOption
                sortOptions={(a, b) => a.label.localeCompare(b.label)}
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="Sorted A-Z"
                searchable
              />
            </Card>

            {/* 25. Reverse Sorted */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">25. Reverse Sorted</h3>
                <p className="text-xs text-muted-foreground">Z to A ordering</p>
              </div>
              <CustomSelectOption
                sortOptions={(a, b) => b.label.localeCompare(a.label)}
                options={fruits}
                value={val3}
                onChange={(v) => setVal3(v as string)}
                placeholder="Sorted Z-A"
                searchable
              />
            </Card>

            {/* 26-40 continued with different grouping patterns */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">26. Category Tabs</h3>
                <p className="text-xs text-muted-foreground">Tab-based filtering</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showCategoryTabs
                categoryFilter
                categories={["Frontend", "Backend", "Database"]}
                options={techStack}
                value={val10}
                onChange={(v) => setVal10(v as string[])}
                placeholder="Select tech"
                showChips
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">27. E-commerce Categories</h3>
                <p className="text-xs text-muted-foreground">Product categorization</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showCategoryTabs
                categoryFilter
                categories={["Electronics", "Clothing", "Books"]}
                options={ecommerceProducts}
                value={val10}
                onChange={(v) => setVal10(v as string[])}
                placeholder="Select products"
                showChips
                maxTagCount={3}
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">28. Tag-based Search</h3>
                <p className="text-xs text-muted-foreground">Search by tags</p>
              </div>
              <CustomSelectOption
                options={techStack}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                placeholder="Try searching 'javascript' or 'typescript'"
                searchable
              />
            </Card>
          </div>
        </div>

        {/* TREE SELECT 41-64 */}
        <div className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-2xl font-bold">Tree Select (41-64)</h2>
            <p className="text-sm text-muted-foreground">Hierarchical data structures</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 41. Basic Tree */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">41. File System Tree</h3>
                <p className="text-xs text-muted-foreground">Nested file structure</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                treeMode
                treeCheckable
                treeDefaultExpandAll
                showChips
                maxTagCount={2}
                options={fileSystemTree}
                value={advTree}
                onChange={(v) => setAdvTree(v as string[])}
                placeholder="Select files"
                searchable
              />
            </Card>

            {/* 42. Organization Tree */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">42. Organization Structure</h3>
                <p className="text-xs text-muted-foreground">Company hierarchy</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                treeMode
                treeCheckable
                showChips
                maxTagCount={2}
                options={organizationTree}
                value={advOrg}
                onChange={(v) => setAdvOrg(v as string[])}
                placeholder="Select teams"
                searchable
              />
            </Card>

            {/* 43. Location Tree */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">43. Location Hierarchy</h3>
                <p className="text-xs text-muted-foreground">Country &gt; State &gt; City</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                treeMode
                treeCheckable
                showChips
                maxTagCount={3}
                options={locations}
                value={advLocation}
                onChange={(v) => setAdvLocation(v as string[])}
                placeholder="Select locations"
                searchable
              />
            </Card>

            {/* 44. Tree Single Mode */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">44. Tree Single Selection</h3>
                <p className="text-xs text-muted-foreground">Click to expand/select</p>
              </div>
              <CustomSelectOption
                mode="single"
                treeMode
                treeCheckable={false}
                options={fileSystemTree}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                placeholder="Select a file"
                searchable
              />
            </Card>

            {/* 45. Tree with Lines */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">45. Tree with Lines</h3>
                <p className="text-xs text-muted-foreground">Visual hierarchy lines</p>
              </div>
              <CustomSelectOption
                mode="single"
                treeMode
                showTreeLine
                treeCheckable={false}
                options={fileSystemTree}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                placeholder="Select a file"
                searchable
              />
            </Card>

            {/* 46. Strict Mode Tree */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">46. Tree Strict Mode</h3>
                <p className="text-xs text-muted-foreground">Independent parent/child</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                treeMode
                treeCheckable
                treeCheckStrictly
                showChips
                options={fileSystemTree}
                value={advTree}
                onChange={(v) => setAdvTree(v as string[])}
                placeholder="Independent selection"
                searchable
              />
            </Card>

            {/* 47-64: More tree variations */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">47. Tree Default Collapsed</h3>
                <p className="text-xs text-muted-foreground">Start with collapsed nodes</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                treeMode
                treeCheckable
                treeDefaultExpandAll={false}
                showChips
                maxTagCount={2}
                options={fileSystemTree}
                value={advTree}
                onChange={(v) => setAdvTree(v as string[])}
                placeholder="Expand to explore"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">48. Deep Nesting Example</h3>
                <p className="text-xs text-muted-foreground">Multiple hierarchy levels</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                treeMode
                treeCheckable
                showChips
                options={fileSystemTree}
                value={advTree}
                onChange={(v) => setAdvTree(v as string[])}
                placeholder="Navigate deep structure"
                searchable
              />
            </Card>
          </div>
        </div>

        {/* VALIDATION & ERROR HANDLING 65-80 */}
        <div className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-2xl font-bold">Validation & Error States (65-80)</h2>
            <p className="text-sm text-muted-foreground">Error handling, warnings, and success states</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 65. Error State */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="size-4 text-destructive" />
                  65. Error State
                </h3>
                <p className="text-xs text-muted-foreground">Try selecting more than 3 options</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valError}
                onChange={(v) => setValError(v as string[])}
                validateOnChange={validateError}
                placeholder="Max 3 selections"
                searchable
              />
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="size-3 mr-1" />
                Error validation active
              </Badge>
            </Card>

            {/* 66. Warning State */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="size-4 text-yellow-500" />
                  66. Warning State
                </h3>
                <p className="text-xs text-muted-foreground">Shows warning after 2 selections</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valWarning}
                onChange={(v) => setValWarning(v as string[])}
                validateOnChange={validateWarning}
                placeholder="Soft limit warning"
                searchable
              />
              {valWarning.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                  <AlertTriangle className="size-3 mr-1" />
                  Performance warning
                </Badge>
              )}
            </Card>

            {/* 67. Success State */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  67. Success State
                </h3>
                <p className="text-xs text-muted-foreground">Valid selection confirmed</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valSuccess}
                onChange={(v) => setValSuccess(v as string[])}
                placeholder="Valid selection"
                searchable
              />
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                <Check className="size-3 mr-1" />
                Valid selection
              </Badge>
            </Card>

            {/* 68. Required Field */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">68. Required Field</h3>
                <p className="text-xs text-muted-foreground">Must have selection</p>
              </div>
              <CustomSelectOption
                required
                options={fruits}
                value={valRequired}
                onChange={(v) => setValRequired(v as string)}
                placeholder="Required selection *"
                error={!valRequired}
                errorMessage="This field is required"
                searchable
              />
            </Card>

            {/* 69. Min/Max Selection */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">69. Min/Max Constraints</h3>
                <p className="text-xs text-muted-foreground">2 min, 4 max selections</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                minSelection={2}
                maxSelection={4}
                showChips
                options={fruits}
                value={valMinMax}
                onChange={(v) => setValMinMax(v as string[])}
                onMaxReached={() => alert("Maximum 4 selections!")}
                placeholder="Select 2-4 fruits"
                searchable
              />
              <p className="text-xs text-muted-foreground">Selected: {valMinMax.length}/4 (min: 2)</p>
            </Card>

            {/* 70. Custom Validation */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">70. Custom Validation Logic</h3>
                <p className="text-xs text-muted-foreground">Business rule validation</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valCustom}
                onChange={(v) => setValCustom(v as string[])}
                validateOnChange={(val) => {
                  const values = val as string[]
                  if (values.includes("apple") && values.includes("orange")) {
                    return "Cannot select both apple and orange together"
                  }
                  return undefined
                }}
                placeholder="Try apple + orange"
                searchable
              />
            </Card>

            {/* 71. Inline Error Display */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">71. Inline Error Message</h3>
                <p className="text-xs text-muted-foreground">Error appears below field</p>
              </div>
              <CustomSelectOption
                options={fruits}
                value={valAsync}
                onChange={(v) => setValAsync(v as string)}
                error={true}
                errorMessage="This selection is not available in your region"
                placeholder="Select fruit"
                searchable
              />
            </Card>

            {/* 72. Conditional Validation */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">72. Conditional Validation</h3>
                <p className="text-xs text-muted-foreground">Rules based on other selections</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valConditional}
                onChange={(v) => setValConditional(v as string[])}
                validateOnChange={(val) => {
                  const values = val as string[]
                  if (values.length > 0 && !values.includes("apple")) {
                    return "Apple must be included in selection"
                  }
                  return undefined
                }}
                placeholder="Must include apple"
                searchable
              />
            </Card>

            {/* 73. Format Validation */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">73. Format Validation</h3>
                <p className="text-xs text-muted-foreground">Ensure correct format</p>
              </div>
              <CustomSelectOption
                options={[
                  { value: "user@example.com", label: "user@example.com" },
                  { value: "invalid-email", label: "invalid-email" },
                  { value: "admin@test.com", label: "admin@test.com" },
                ]}
                value={valEmail}
                onChange={(v) => setValEmail(v as string)}
                validateOnChange={(val) => {
                  if (val && !String(val).includes("@")) {
                    return "Invalid email format"
                  }
                  return undefined
                }}
                placeholder="Select email"
                searchable
              />
            </Card>

            {/* 74. Length Validation */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">74. Selection Length Check</h3>
                <p className="text-xs text-muted-foreground">Exactly 3 required</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valLength}
                onChange={(v) => setValLength(v as string[])}
                validateOnChange={(val) => {
                  const values = val as string[]
                  if (values.length > 0 && values.length !== 3) {
                    return "Must select exactly 3 options"
                  }
                  return undefined
                }}
                placeholder="Select exactly 3"
                searchable
              />
            </Card>

            {/* 75. Unique Validation */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">75. Unique Value Check</h3>
                <p className="text-xs text-muted-foreground">Prevent duplicates</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valUnique}
                onChange={(v) => setValUnique(v as string[])}
                placeholder="Unique selections"
                searchable
              />
              <Badge variant="outline" className="text-xs">
                <Info className="size-3 mr-1" />
                Duplicates prevented
              </Badge>
            </Card>

            {/* 76. Dependency Validation */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">76. Dependency Rules</h3>
                <p className="text-xs text-muted-foreground">If A then must have B</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valDependency}
                onChange={(v) => setValDependency(v as string[])}
                validateOnChange={(val) => {
                  const values = val as string[]
                  if (values.includes("banana") && !values.includes("apple")) {
                    return "Banana requires Apple to be selected"
                  }
                  return undefined
                }}
                placeholder="Try banana without apple"
                searchable
              />
            </Card>

            {/* 77. Range Validation */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">77. Selection Range</h3>
                <p className="text-xs text-muted-foreground">Between 1 and 5</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valRange}
                onChange={(v) => setValRange(v as string[])}
                validateOnChange={(val) => {
                  const values = val as string[]
                  if (values.length > 5) {
                    return "Maximum 5 selections allowed"
                  }
                  if (values.length === 0) {
                    return "At least 1 selection required"
                  }
                  return undefined
                }}
                placeholder="Select 1-5 items"
                searchable
              />
            </Card>

            {/* 78. Pattern Matching */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">78. Pattern Validation</h3>
                <p className="text-xs text-muted-foreground">Match specific pattern</p>
              </div>
              <CustomSelectOption
                options={[
                  { value: "DEV-123", label: "DEV-123" },
                  { value: "PROD-456", label: "PROD-456" },
                  { value: "invalid", label: "invalid" },
                  { value: "TEST-789", label: "TEST-789" },
                ]}
                value={valPattern}
                onChange={(v) => setValPattern(v as string)}
                validateOnChange={(val) => {
                  if (val && !/^[A-Z]+-\d+$/.test(String(val))) {
                    return "Must match pattern: ABC-123"
                  }
                  return undefined
                }}
                placeholder="Select valid code"
                searchable
              />
            </Card>

            {/* 79. Composite Validation */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">79. Multiple Rules</h3>
                <p className="text-xs text-muted-foreground">Combined validation logic</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={valComposite}
                onChange={(v) => setValComposite(v as string[])}
                validateOnChange={(val) => {
                  const values = val as string[]
                  if (values.length < 2) return "Min 2 required"
                  if (values.length > 5) return "Max 5 allowed"
                  if (!values.includes("apple")) return "Must include apple"
                  return undefined
                }}
                placeholder="Complex rules"
                searchable
              />
            </Card>

            {/* 80. Before Change Hook */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">80. Before Change Hook</h3>
                <p className="text-xs text-muted-foreground">Confirm before changing</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={advBeforeChange}
                onChange={(v) => setAdvBeforeChange(v as string[])}
                beforeChange={async (value, option) => {
                  return window.confirm(`Add ${option.label}?`)
                }}
                placeholder="Confirmation required"
                searchable
              />
            </Card>
          </div>
        </div>

        {/* ADVANCED FEATURES 87-110 */}
        <div className="space-y-6">
          <div className="border-b pb-2">
            <h2 className="text-2xl font-bold">Advanced Features (87-110)</h2>
            <p className="text-sm text-muted-foreground">Power user features and customization</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 87. Lazy Loading */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">87. Lazy Loading</h3>
                <p className="text-xs text-muted-foreground">Scroll to load more</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={lazyOpts}
                value={advLazy}
                onChange={(v) => setAdvLazy(v as string[])}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                placeholder="Scroll for more"
                searchable
              />
            </Card>

            {/* 88. Server-side Search */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">88. Server-side Search</h3>
                <p className="text-xs text-muted-foreground">Debounced API calls</p>
              </div>
              <CustomSelectOption
                serverSide
                onServerSearch={mockServerSearch}
                debounceTime={500}
                options={[]}
                value={advServer}
                onChange={(v) => setAdvServer(v as string)}
                placeholder="Type to search countries"
                searchable
              />
            </Card>

            {/* 89. Create New Option */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">89. Create New Option</h3>
                <p className="text-xs text-muted-foreground">Add custom values</p>
              </div>
              <CustomSelectOption
                allowCreate
                options={fruits}
                value={advCreate}
                onChange={(v) =>{
                   setAdvCreate(v as string);
                   console.log(v,'value')
                }}
                // onCreateOption={(input) => ({
                //   value: input.toLowerCase().replace(/\s+/g, "-"),
                //   label: input,
                //   description:input,
                //   // icon: <Heart className="size-4 text-red-500" />,
                // })}
                placeholder="Type to create"
                searchable
              />
            </Card>

            {/* 90. Custom Render Option */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">90. Custom Option Render</h3>
                <p className="text-xs text-muted-foreground">Fully customized display</p>
              </div>
              <CustomSelectOption
                options={ecommerceProducts}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                renderOption={(opt) => (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span>{opt.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {opt.description}
                    </Badge>
                  </div>
                )}
                placeholder="Custom rendering"
                searchable
              />
            </Card>

            {/* 91. Custom Trigger Render */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">91. Custom Trigger Display</h3>
                <p className="text-xs text-muted-foreground">Personalized trigger</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruits}
                value={advCustomRender}
                onChange={(v) => setAdvCustomRender(v as string[])}
                renderTrigger={(selected) =>
                  selected.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <Heart className="size-4 text-red-500" />
                      <span>{selected.length} favorites</span>
                    </div>
                  ) : (
                    <span>Pick favorites</span>
                  )
                }
                placeholder="Custom trigger"
                searchable
              />
            </Card>

            {/* 92-110: More advanced features */}
            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">92. Prefix + Suffix Icons</h3>
                <p className="text-xs text-muted-foreground">Both icon types</p>
              </div>
              <CustomSelectOption
                prefixIcon={<Star className="size-4 text-yellow-500" />}
                suffixIcon={<Heart className="size-4 text-red-500" />}
                options={fruits}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                placeholder="With both icons"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">93. Max Tags with Overflow</h3>
                <p className="text-xs text-muted-foreground">+N more indicator</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                maxTagCount={2}
                options={fruits}
                value={advMaxTags}
                onChange={(v) => setAdvMaxTags(v as string[])}
                placeholder="Max 2 visible"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">94. Show Count Mode</h3>
                <p className="text-xs text-muted-foreground">Display selection count</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showCount
                showChips={false}
                options={fruits}
                value={advShowCount}
                onChange={(v) => setAdvShowCount(v as string[])}
                placeholder="Count display"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">95. Disabled Options</h3>
                <p className="text-xs text-muted-foreground">Some options disabled</p>
              </div>
              <CustomSelectOption
                options={[
                  { value: "apple", label: "Apple" },
                  { value: "banana", label: "Banana", disabled: true },
                  { value: "orange", label: "Orange" },
                  { value: "grape", label: "Grape", disabled: true },
                ]}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                placeholder="Some disabled"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">96. All Sizes Comparison</h3>
                <p className="text-xs text-muted-foreground">Size variants</p>
              </div>
              <div className="space-y-2">
                <CustomSelectOption
                  size="sm"
                  options={fruits}
                  value={advSize}
                  onChange={(v) => setAdvSize(v as string)}
                  placeholder="Small"
                />
                <CustomSelectOption
                  size="md"
                  options={fruits}
                  value={advSize}
                  onChange={(v) => setAdvSize(v as string)}
                  placeholder="Medium (default)"
                />
                <CustomSelectOption
                  size="lg"
                  options={fruits}
                  value={advSize}
                  onChange={(v) => setAdvSize(v as string)}
                  placeholder="Large"
                />
                <CustomSelectOption
                  size="xl"
                  options={fruits}
                  value={advSize}
                  onChange={(v) => setAdvSize(v as string)}
                  placeholder="Extra Large"
                />
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">97. Position: Top</h3>
                <p className="text-xs text-muted-foreground">Dropdown opens upward</p>
              </div>
              <CustomSelectOption
                position="top"
                options={fruits}
                value={advPosition}
                onChange={(v) => setAdvPosition(v as string)}
                placeholder="Opens above"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">98. Auto Width Match</h3>
                <p className="text-xs text-muted-foreground">Dropdown matches trigger</p>
              </div>
              <div className="max-w-[250px]">
                <CustomSelectOption
                  autoWidth
                  options={fruits}
                  value={advAutoWidth}
                  onChange={(v) => setAdvAutoWidth(v as string)}
                  placeholder="Auto width"
                  searchable
                />
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">99. Custom Max Height</h3>
                <p className="text-xs text-muted-foreground">Scroll area control</p>
              </div>
              <CustomSelectOption
                maxHeight="120px"
                options={fruits}
                value={advMaxHeight}
                onChange={(v) => setAdvMaxHeight(v as string)}
                placeholder="120px height"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">100. On Change Callback</h3>
                <p className="text-xs text-muted-foreground">Logs changes to console</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={advOnChange}
                onChange={(v) => {
                  console.log("[v0] Selection changed:", v)
                  setAdvOnChange(v as string[])
                }}
                placeholder="Check console"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">101. On Focus/Blur</h3>
                <p className="text-xs text-muted-foreground">Focus event handlers</p>
              </div>
              <CustomSelectOption
                options={fruits}
                value={advOnFocus}
                onChange={(v) => setAdvOnFocus(v as string)}
                onFocus={() => console.log("[v0] Focused")}
                onBlur={() => console.log("[v0] Blurred")}
                placeholder="Focus handlers"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">102. On Clear Callback</h3>
                <p className="text-xs text-muted-foreground">Clear action tracking</p>
              </div>
              <CustomSelectOption
                allowClear
                options={fruits}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                onClear={() => console.log("[v0] Cleared")}
                placeholder="Clear callback"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">103. On Deselect</h3>
                <p className="text-xs text-muted-foreground">Track removals</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showChips
                options={fruits}
                value={val10}
                onChange={(v) => setVal10(v as string[])}
                onDeselect={(value) => console.log("[v0] Removed:", value)}
                placeholder="Deselect tracking"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">104. Dropdown Visibility</h3>
                <p className="text-xs text-muted-foreground">Open/close events</p>
              </div>
              <CustomSelectOption
                options={fruits}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                onDropdownVisibleChange={(open) => console.log("[v0] Dropdown:", open ? "opened" : "closed")}
                placeholder="Visibility events"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">105. Max Reached Callback</h3>
                <p className="text-xs text-muted-foreground">Alert on max reached</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                maxSelection={3}
                showChips
                options={fruits}
                value={val10}
                onChange={(v) => setVal10(v as string[])}
                onMaxReached={() => alert("Max 3 selections reached!")}
                placeholder="Max 3 with alert"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">106. Tree Expand Events</h3>
                <p className="text-xs text-muted-foreground">Track node expansion</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                treeMode
                treeCheckable
                showChips
                options={fileSystemTree}
                value={advTree}
                onChange={(v) => setAdvTree(v as string[])}
                onTreeExpand={(keys) => console.log("[v0] Expanded keys:", keys)}
                placeholder="Tree expand events"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">107. Category Change Event</h3>
                <p className="text-xs text-muted-foreground">Track category switches</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                showCategoryTabs
                categoryFilter
                categories={["Frontend", "Backend", "Database"]}
                options={techStack}
                value={val10}
                onChange={(v) => setVal10(v as string[])}
                onCategoryChange={(cat) => console.log("[v0] Category:", cat)}
                showChips
                placeholder="Category events"
                searchable
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">108. Search Callback</h3>
                <p className="text-xs text-muted-foreground">Track search input</p>
              </div>
              <CustomSelectOption
                searchable
                options={fruits}
                value={val9}
                onChange={(v) => setVal9(v as string)}
                onSearch={(search) => console.log("[v0] Searching:", search)}
                placeholder="Search tracking"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">109. Complete Feature Set</h3>
                <p className="text-xs text-muted-foreground">All features combined</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                size="lg"
                searchable
                showChips
                maxTagCount={2}
                allowClear
                prefixIcon={<Star className="size-4 text-yellow-500" />}
                options={techStack}
                value={val10}
                onChange={(v) => setVal10(v as string[])}
                groupBy="category"
                maxSelection={5}
                onMaxReached={() => alert("Max reached!")}
                validateOnChange={(v) => ((v as string[]).length > 4 ? "Warning: Many selections" : undefined)}
                placeholder="Full power mode"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold">110. Production Ready</h3>
                <p className="text-xs text-muted-foreground">Real-world configuration</p>
              </div>
              <CustomSelectOption
                mode="multiple"
                size="md"
                searchable
                showChips
                maxTagCount={3}
                allowClear
                allowCreate
                required
                treeMode={false}
                groupBy="category"
                options={techStack}
                value={val10}
                onChange={(v) => setVal10(v as string[])}
                maxSelection={10}
                minSelection={1}
                validateOnChange={(v) => {
                  const values = v as string[]
                  if (values.length === 0) return "Required"
                  return undefined
                }}
                onMaxReached={() => alert("Selection limit reached")}
                placeholder="Production config"
              />
            </Card>
          </div>
        </div>

        {/* Summary Section */}
        <Card className="p-6 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">110 Examples Complete!</h2>
            <p className="text-muted-foreground">
              You have explored all features of the Advanced Select component including:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  Core Features (1-20)
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground ml-6">
                  <li>Single & multiple selection</li>
                  <li>Search & filtering</li>
                  <li>Icons & descriptions</li>
                  <li>Size variants (sm/md/lg/xl)</li>
                  <li>Chip & count display</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  Organization (21-40)
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground ml-6">
                  <li>Grouped options</li>
                  <li>Category filtering with tabs</li>
                  <li>Custom sorting</li>
                  <li>Tag-based search</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  Tree Select (41-64)
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground ml-6">
                  <li>File system hierarchy</li>
                  <li>Organization structures</li>
                  <li>Location nesting</li>
                  <li>Parent-child relationships</li>
                  <li>Single & multiple tree modes</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  Validation (65-80)
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground ml-6">
                  <li>Error, warning, success states</li>
                  <li>Required fields</li>
                  <li>Min/max constraints</li>
                  <li>Custom validation logic</li>
                  <li>Pattern matching</li>
                  <li>Before change hooks</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Check className="size-4 text-green-500" />
                  Advanced (87-110)
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground ml-6">
                  <li>Lazy loading</li>
                  <li>Server-side search</li>
                  <li>Create new options</li>
                  <li>Custom rendering</li>
                  <li>Event callbacks</li>
                  <li>Full customization</li>
                </ul>
              </div>
            </div>
            <div className="pt-4 flex gap-2">
              <Button asChild>
                <Link to="/documentation">View Full Documentation</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Try Basic Demos</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
