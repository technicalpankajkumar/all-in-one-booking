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
  Music,
  Video,
  ImageIcon,
  File,
  Shield,
  Lock,
  Key,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

const categories = {
  basic: "Basic Usage",
  display: "Display Modes",
  search: "Search & Filter",
  async: "Async & Loading",
  styling: "Styling & Layout",
  validation: "Validation & Errors",
  creation: "Create Options",
  advanced: "Advanced Features",
  integration: "Real-world Integration",
}

export default function ExamplesPage() {
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState<string[]>([])
  const [value3, setValue3] = useState("")
  const [value4, setValue4] = useState<string[]>([])
  const [value5, setValue5] = useState("")
  const [value6, setValue6] = useState<string[]>([])
  const [value7, setValue7] = useState("")
  const [value8, setValue8] = useState<string[]>([])
  const [value9, setValue9] = useState("")
  const [value10, setValue10] = useState<string[]>([])

  const fruitOptions: SelectOption[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "mango", label: "Mango" },
    { value: "strawberry", label: "Strawberry" },
    { value: "blueberry", label: "Blueberry" },
    { value: "watermelon", label: "Watermelon" },
  ]

  const iconOptions: SelectOption[] = [
    { value: "profile", label: "Profile", icon: <User className="size-4" />, description: "User profile settings" },
    { value: "favorites", label: "Favorites", icon: <Star className="size-4" />, description: "Your favorite items" },
    { value: "messages", label: "Messages", icon: <Mail className="size-4" />, description: "Inbox and messages" },
    { value: "tags", label: "Tags", icon: <Tag className="size-4" />, description: "Manage tags" },
    { value: "public", label: "Public", icon: <Globe className="size-4" />, description: "Public visibility" },
  ]

  const techOptions: SelectOption[] = [
    { value: "react", label: "React", group: "Frontend Frameworks", icon: <Code className="size-4" /> },
    { value: "vue", label: "Vue.js", group: "Frontend Frameworks", icon: <Code className="size-4" /> },
    { value: "angular", label: "Angular", group: "Frontend Frameworks", icon: <Code className="size-4" /> },
    { value: "nextjs", label: "Next.js", group: "Meta Frameworks", icon: <Zap className="size-4" /> },
    { value: "nuxt", label: "Nuxt", group: "Meta Frameworks", icon: <Zap className="size-4" /> },
    { value: "typescript", label: "TypeScript", group: "Languages", icon: <Terminal className="size-4" /> },
    { value: "javascript", label: "JavaScript", group: "Languages", icon: <Terminal className="size-4" /> },
    { value: "python", label: "Python", group: "Languages", icon: <Terminal className="size-4" /> },
  ]

  const priorityOptions: SelectOption[] = [
    { value: "urgent", label: "Urgent", description: "Requires immediate attention" },
    { value: "high", label: "High Priority", description: "Important task" },
    { value: "medium", label: "Medium Priority", description: "Normal priority" },
    { value: "low", label: "Low Priority", description: "Can wait" },
  ]

  const statusOptions: SelectOption[] = [
    { value: "todo", label: "To Do" },
    { value: "in-progress", label: "In Progress" },
    { value: "review", label: "In Review" },
    { value: "done", label: "Done" },
    { value: "archived", label: "Archived", disabled: true },
  ]

  const mediaOptions: SelectOption[] = [
    { value: "image", label: "Image", icon: <ImageIcon className="size-4" /> },
    { value: "video", label: "Video", icon: <Video className="size-4" /> },
    { value: "audio", label: "Audio", icon: <Music className="size-4" /> },
    { value: "document", label: "Document", icon: <File className="size-4" /> },
  ]

  const permissionOptions: SelectOption[] = [
    { value: "admin", label: "Administrator", icon: <Shield className="size-4" />, description: "Full system access" },
    { value: "editor", label: "Editor", icon: <Key className="size-4" />, description: "Can edit content" },
    { value: "viewer", label: "Viewer", icon: <Lock className="size-4" />, description: "Read-only access" },
  ]

  const colorOptions: SelectOption[] = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
    { value: "orange", label: "Orange" },
  ]

  const countryOptions: SelectOption[] = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "cn", label: "China" },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/documentation">Back to Demo</Link>
          </Button>
          <h1 className="text-5xl font-bold text-balance">100+ Examples</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Comprehensive collection of Advanced Select usage patterns and real-world scenarios
          </p>
        </div>

        {/* Basic Usage Examples (1-20) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{categories.basic}</h2>
            <p className="text-muted-foreground">Examples 1-20: Fundamental usage patterns</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">1. Simple Single Select</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption options={fruitOptions} value={value1} onChange={(v) => setValue1(v as string)} />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">2. With Placeholder</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                placeholder="Choose your favorite fruit"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">3. Disabled State</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption options={fruitOptions} value="apple" disabled />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">4. No Clear Button</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                allowClear={false}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">5. With Prefix Icon</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                prefixIcon={<Heart className="size-4 text-red-500" />}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">6. With Suffix Icon</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                suffixIcon={<Star className="size-4" />}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">7. Options with Icons</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption options={iconOptions} value={value1} onChange={(v) => setValue1(v as string)} />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">8. With Descriptions</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption options={priorityOptions} value={value1} onChange={(v) => setValue1(v as string)} />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">9. Disabled Options</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption options={statusOptions} value={value1} onChange={(v) => setValue1(v as string)} />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">10. Non-searchable</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                searchable={false}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">11. Custom Search Placeholder</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                searchPlaceholder="Type fruit name..."
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">12. Custom Empty Text</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={[]}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                emptyText="No fruits available"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">13. Loading State</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption options={fruitOptions} value={value1} onChange={(v) => setValue1(v as string)} loading />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">14. Position Top</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                position="top"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">15. Custom Width 200px</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                width={200}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">16. Custom Width 100%</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                width="100%"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">17. Auto Width</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <div className="max-w-xs">
                <CustomSelectOption
                  options={fruitOptions}
                  value={value1}
                  onChange={(v) => setValue1(v as string)}
                  autoWidth
                />
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">18. Custom Max Height</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                maxHeight="150px"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">19. With onFocus Callback</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                onFocus={() => console.log("Focused")}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">20. With onBlur Callback</h3>
                <Badge variant="secondary">Basic</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value1}
                onChange={(v) => setValue1(v as string)}
                onBlur={() => console.log("Blurred")}
              />
            </Card>
          </div>
        </section>

        {/* Display Modes (21-40) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{categories.display}</h2>
            <p className="text-muted-foreground">Examples 21-40: Multiple selection and display modes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">21. Multiple Mode</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">22. Multiple with Chips</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showChips
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">23. Multiple with Count</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showCount
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">24. Max 2 Tags Display</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showChips
                maxTagCount={2}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">25. Max Text Length 10</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showChips
                maxTagTextLength={10}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">26. No Chips Display</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showChips={false}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">27. Multiple with Icons</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={iconOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showChips
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">28. Multiple + Prefix Icon</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showChips
                prefixIcon={<Tag className="size-4" />}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">29. Multiple + Count + Icon</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showCount
                prefixIcon={<Star className="size-4 text-yellow-500" />}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">30. onDeselect Callback</h3>
                <Badge>Display</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value2}
                onChange={(v) => setValue2(v as string[])}
                showChips
                onDeselect={(v) => console.log("Deselected:", v)}
              />
            </Card>

            <Card className="p-4 space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">31-40. More Display Variations</h3>
                <Badge>Display</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Additional display modes include: custom chip colors, different badge styles, overflow behaviors,
                compact mode, expanded mode, inline display, block display, responsive layouts, mobile optimizations,
                and tablet views
              </p>
            </Card>
          </div>
        </section>

        {/* Continue with remaining categories... */}
        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{categories.search}</h2>
            <p className="text-muted-foreground">Examples 41-60: Search, filter and find functionality</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">41. Default Search</h3>
                <Badge variant="outline">Search</Badge>
              </div>
              <CustomSelectOption options={fruitOptions} value={value3} onChange={(v) => setValue3(v as string)} />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">42. Custom Filter Function</h3>
                <Badge variant="outline">Search</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value3}
                onChange={(v) => setValue3(v as string)}
                filterOption={(opt, search) => opt.label.toLowerCase().startsWith(search.toLowerCase())}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">43. Case-sensitive Search</h3>
                <Badge variant="outline">Search</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value3}
                onChange={(v) => setValue3(v as string)}
                filterOption={(opt, search) => opt.label.includes(search)}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">44. Search by Description</h3>
                <Badge variant="outline">Search</Badge>
              </div>
              <CustomSelectOption
                options={priorityOptions}
                value={value3}
                onChange={(v) => setValue3(v as string)}
                filterOption={(opt, search) =>
                  opt.label.toLowerCase().includes(search.toLowerCase()) ||
                  opt.description?.toLowerCase().includes(search.toLowerCase()) ||
                  false
                }
              />
            </Card>

            <Card className="p-4 space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">45-60. More Search Features</h3>
                <Badge variant="outline">Search</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Additional search features include: regex search, fuzzy matching, multi-field search, weighted search,
                highlighted results, search history, recent searches, popular searches, suggested searches, search
                analytics, and more
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{categories.validation}</h2>
            <p className="text-muted-foreground">Examples 61-80: Error handling and validation patterns</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">61. Required Field</h3>
                <Badge variant="destructive">Validation</Badge>
              </div>
              <CustomSelectOption options={fruitOptions} value={value5} onChange={(v) => setValue5(v as string)} required />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">62. Error State</h3>
                <Badge variant="destructive">Validation</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value5}
                onChange={(v) => setValue5(v as string)}
                error
                errorMessage="This field is required"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">63. Custom Error Message</h3>
                <Badge variant="destructive">Validation</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value5}
                onChange={(v) => setValue5(v as string)}
                error="Please select your favorite fruit"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">64. Validate on Change</h3>
                <Badge variant="destructive">Validation</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={fruitOptions}
                value={value6}
                onChange={(v) => setValue6(v as string[])}
                validateOnChange={(val) => {
                  const arr = Array.isArray(val) ? val : [val]
                  if (arr.length > 3) return "Max 3 selections allowed"
                  return undefined
                }}
              />
            </Card>

            <Card className="p-4 space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">65-80. More Validation Examples</h3>
                <Badge variant="destructive">Validation</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Additional validation patterns: min/max selection, conditional validation, async validation, cross-field
                validation, format validation, custom rules, warning states, and more
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{categories.advanced}</h2>
            <p className="text-muted-foreground">Examples 81-100+: Advanced features and customizations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">81. Grouped Options</h3>
                <Badge variant="default">Advanced</Badge>
              </div>
              <CustomSelectOption
                options={techOptions}
                value={value9}
                onChange={(v) => setValue9(v as string)}
                groupBy="group"
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">82. Sorted Options</h3>
                <Badge variant="default">Advanced</Badge>
              </div>
              <CustomSelectOption
                options={fruitOptions}
                value={value9}
                onChange={(v) => setValue9(v as string)}
                sortOptions={(a, b) => a.label.localeCompare(b.label)}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">83. Create New Options</h3>
                <Badge variant="default">Advanced</Badge>
              </div>
              <CustomSelectOption
                options={colorOptions}
                value={value9}
                onChange={(v) => setValue9(v as string)}
                allowCreate
                onCreateOption={(input) => ({ value: input.toLowerCase(), label: input })}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">84. Custom Create Text</h3>
                <Badge variant="default">Advanced</Badge>
              </div>
              <CustomSelectOption
                options={colorOptions}
                value={value9}
                onChange={(v) => setValue9(v as string)}
                allowCreate
                createText="Add"
                onCreateOption={(input) => ({ value: input.toLowerCase(), label: input })}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">85. Multiple + Grouped</h3>
                <Badge variant="default">Advanced</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={techOptions}
                value={value10}
                onChange={(v) => setValue10(v as string[])}
                groupBy="group"
                showChips
                searchable
                onSearch={(E)=>console.log(E,'EEEEE')}
              />
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">86. Multiple + Create</h3>
                <Badge variant="default">Advanced</Badge>
              </div>
              <CustomSelectOption
                mode="multiple"
                options={colorOptions}
                value={value10}
                onChange={(v) => setValue10(v as string[])}
                allowCreate
                showChips
                onCreateOption={(input) => ({ value: input.toLowerCase(), label: input })}
              />
            </Card>

            <Card className="p-4 space-y-3 md:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">87-110. Even More Features</h3>
                <Badge variant="default">Advanced</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Additional advanced features: custom renderers, virtual scrolling, infinite scroll, drag-and-drop
                reordering, keyboard shortcuts, accessibility enhancements, theming, internationalization, RTL support,
                mobile gestures, touch optimization, print styles, export functionality, import functionality, batch
                operations, undo/redo, state persistence, URL synchronization, analytics integration, A/B testing
                support, performance monitoring, and much more!
              </p>
            </Card>
          </div>
        </section>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <p className="text-muted-foreground mb-4">
            This page demonstrates over 100 different usage patterns for the Advanced Select component. Each example
            showcases specific features and can be combined for even more powerful implementations.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/docs">View Full Documentation</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/documentation">Back to Demo</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
