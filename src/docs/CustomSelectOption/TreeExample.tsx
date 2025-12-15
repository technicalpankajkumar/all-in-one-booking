"use client"

import { useState } from "react"
import { CustomSelectOption, type SelectOption } from "@/components/custom-ui/CustomSelectOption"
import { Card } from "@/components/ui/card"
import {
  Folder,
  FolderTree,
  File,
  FileText,
  ImageIcon,
  Archive,
  Database,
  Server,
  Globe,
  Users,
  User,
  Building,
  MapPin,
  Package,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const fileSystemTree: SelectOption[] = [
  {
    value: "root",
    label: "Root",
    icon: <Server className="size-4 text-blue-500" />,
    children: [
      {
        value: "home",
        label: "Home",
        icon: <Folder className="size-4 text-yellow-500" />,
        children: [
          {
            value: "documents",
            label: "Documents",
            icon: <Folder className="size-4" />,
            children: [
              { value: "doc1", label: "Resume.pdf", icon: <FileText className="size-4" /> },
              { value: "doc2", label: "Cover Letter.docx", icon: <FileText className="size-4" /> },
            ],
          },
          {
            value: "downloads",
            label: "Downloads",
            icon: <Folder className="size-4" />,
            children: [
              { value: "dl1", label: "installer.exe", icon: <Archive className="size-4" /> },
              { value: "dl2", label: "backup.zip", icon: <Archive className="size-4" /> },
            ],
          },
          {
            value: "pictures",
            label: "Pictures",
            icon: <Folder className="size-4" />,
            children: [
              { value: "pic1", label: "vacation.jpg", icon: <ImageIcon className="size-4" /> },
              { value: "pic2", label: "family.png", icon: <ImageIcon className="size-4" /> },
            ],
          },
        ],
      },
      {
        value: "var",
        label: "Var",
        icon: <Folder className="size-4 text-green-500" />,
        children: [
          {
            value: "log",
            label: "Log",
            icon: <Folder className="size-4" />,
            children: [
              { value: "log1", label: "system.log", icon: <File className="size-4" /> },
              { value: "log2", label: "error.log", icon: <File className="size-4" /> },
            ],
          },
        ],
      },
    ],
  },
]

const companyOrgChart: SelectOption[] = [
  {
    value: "headquarters",
    label: "Headquarters - New York",
    icon: <Building className="size-4 text-blue-500" />,
    children: [
      {
        value: "engineering",
        label: "Engineering Department",
        icon: <Users className="size-4 text-purple-500" />,
        children: [
          {
            value: "frontend-team",
            label: "Frontend Team",
            icon: <Users className="size-4" />,
            children: [
              { value: "fe-lead", label: "Sarah Chen - Team Lead", icon: <User className="size-4" /> },
              { value: "fe-dev1", label: "Alex Kumar - Senior Dev", icon: <User className="size-4" /> },
              { value: "fe-dev2", label: "Maria Garcia - Developer", icon: <User className="size-4" /> },
            ],
          },
          {
            value: "backend-team",
            label: "Backend Team",
            icon: <Users className="size-4" />,
            children: [
              { value: "be-lead", label: "James Wilson - Team Lead", icon: <User className="size-4" /> },
              { value: "be-dev1", label: "Emily Brown - Senior Dev", icon: <User className="size-4" /> },
            ],
          },
        ],
      },
      {
        value: "sales",
        label: "Sales Department",
        icon: <Users className="size-4 text-green-500" />,
        children: [
          { value: "sales-dir", label: "Robert Taylor - Director", icon: <User className="size-4" /> },
          { value: "sales-mgr1", label: "Lisa Anderson - Manager", icon: <User className="size-4" /> },
          { value: "sales-mgr2", label: "David Martinez - Manager", icon: <User className="size-4" /> },
        ],
      },
    ],
  },
  {
    value: "branch-sf",
    label: "Branch Office - San Francisco",
    icon: <Building className="size-4 text-orange-500" />,
    children: [
      {
        value: "sf-sales",
        label: "Sales Team",
        icon: <Users className="size-4" />,
        children: [
          { value: "sf-sales1", label: "Jennifer Lee - Account Manager", icon: <User className="size-4" /> },
          { value: "sf-sales2", label: "Michael Chang - Sales Rep", icon: <User className="size-4" /> },
        ],
      },
    ],
  },
]

const productCatalog: SelectOption[] = [
  {
    value: "electronics",
    label: "Electronics",
    icon: <Package className="size-4 text-blue-500" />,
    category: "Main Category",
    children: [
      {
        value: "computers",
        label: "Computers",
        icon: <Package className="size-4" />,
        children: [
          {
            value: "laptop1",
            label: "MacBook Pro 16",
            description: "$2,499",
            icon: <ShoppingCart className="size-4" />,
          },
          { value: "laptop2", label: "Dell XPS 15", description: "$1,899", icon: <ShoppingCart className="size-4" /> },
          { value: "desktop1", label: "iMac 27", description: "$1,799", icon: <ShoppingCart className="size-4" /> },
        ],
      },
      {
        value: "phones",
        label: "Smartphones",
        icon: <Package className="size-4" />,
        children: [
          { value: "phone1", label: "iPhone 15 Pro", description: "$999", icon: <ShoppingCart className="size-4" /> },
          {
            value: "phone2",
            label: "Samsung Galaxy S24",
            description: "$899",
            icon: <ShoppingCart className="size-4" />,
          },
        ],
      },
    ],
  },
  {
    value: "furniture",
    label: "Furniture",
    icon: <Package className="size-4 text-orange-500" />,
    category: "Main Category",
    children: [
      {
        value: "office-furniture",
        label: "Office Furniture",
        icon: <Package className="size-4" />,
        children: [
          { value: "desk1", label: "Standing Desk", description: "$599", icon: <ShoppingCart className="size-4" /> },
          { value: "chair1", label: "Ergonomic Chair", description: "$399", icon: <ShoppingCart className="size-4" /> },
        ],
      },
    ],
  },
]

const locationHierarchy: SelectOption[] = [
  {
    value: "usa",
    label: "United States",
    icon: <Globe className="size-4 text-blue-500" />,
    children: [
      {
        value: "california",
        label: "California",
        icon: <MapPin className="size-4" />,
        children: [
          { value: "sf", label: "San Francisco", description: "Population: 874k" },
          { value: "la", label: "Los Angeles", description: "Population: 3.9M" },
          { value: "sd", label: "San Diego", description: "Population: 1.4M" },
        ],
      },
      {
        value: "new-york",
        label: "New York",
        icon: <MapPin className="size-4" />,
        children: [
          { value: "nyc", label: "New York City", description: "Population: 8.3M" },
          { value: "buffalo", label: "Buffalo", description: "Population: 278k" },
        ],
      },
    ],
  },
  {
    value: "uk",
    label: "United Kingdom",
    icon: <Globe className="size-4 text-red-500" />,
    children: [
      {
        value: "england",
        label: "England",
        icon: <MapPin className="size-4" />,
        children: [
          { value: "london", label: "London", description: "Population: 9M" },
          { value: "manchester", label: "Manchester", description: "Population: 547k" },
        ],
      },
    ],
  },
]

export default function TreeExamplesPage() {
  const [fsValue, setFsValue] = useState<string[]>([])
  const [orgValue, setOrgValue] = useState<string[]>([])
  const [productValue, setProductValue] = useState<string>("")
  const [locationValue, setLocationValue] = useState<string[]>([])
  const [strictValue, setStrictValue] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/documentation">Back to Demo</Link>
          </Button>
          <h1 className="text-5xl font-bold text-balance">Tree & Nested Select Examples</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Advanced hierarchical and nested selection patterns with real-world use cases
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                <FolderTree className="size-5" />
                File System Navigator
              </h2>
              <p className="text-sm text-muted-foreground">
                Multi-level file system with folders and files. Selecting a folder selects all its contents
              </p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={fileSystemTree}
              value={fsValue}
              onChange={(val) => setFsValue(val as string[])}
              placeholder="Navigate file system..."
              treeMode
              treeCheckable
              treeDefaultExpandAll
              showTreeLine
              showChips
              maxTagCount={4}
              searchPlaceholder="Search files and folders..."
            />
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Selected items: {fsValue.length}</p>
              <p className="font-mono text-xs">{fsValue.join(", ") || "none"}</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                <Building className="size-5" />
                Organization Chart
              </h2>
              <p className="text-sm text-muted-foreground">
                Company hierarchy with departments and team members. Great for permission management
              </p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={companyOrgChart}
              value={orgValue}
              onChange={(val) => setOrgValue(val as string[])}
              placeholder="Select teams or members..."
              treeMode
              treeCheckable
              showChips
              maxTagCount={3}
              searchPlaceholder="Search departments or people..."
            />
            <div className="text-xs text-muted-foreground">
              <p>Selected: {orgValue.length} team members/departments</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                <ShoppingCart className="size-5" />
                Product Catalog - Single Selection
              </h2>
              <p className="text-sm text-muted-foreground">
                Browse product categories. Click to expand, select individual products
              </p>
            </div>
            <CustomSelectOption
              mode="single"
              options={productCatalog}
              value={productValue}
              onChange={(val) => setProductValue(val as string)}
              placeholder="Browse products..."
              treeMode
              treeCheckable={false}
              showTreeLine
              searchPlaceholder="Search products..."
            />
            <div className="text-xs text-muted-foreground">
              <p>Selected: {productValue || "none"}</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                <Globe className="size-5" />
                Location Hierarchy
              </h2>
              <p className="text-sm text-muted-foreground">Country → State → City hierarchy with descriptions</p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={locationHierarchy}
              value={locationValue}
              onChange={(val) => setLocationValue(val as string[])}
              placeholder="Select locations..."
              treeMode
              treeCheckable
              treeDefaultExpandAll
              showChips
              maxTagCount={5}
            />
            <div className="text-xs text-muted-foreground">
              <p>Selected locations: {locationValue.join(", ") || "none"}</p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
                <Database className="size-5" />
                Tree Select - Strict Mode
              </h2>
              <p className="text-sm text-muted-foreground">
                Parent and children are independent - selecting parent doesn't auto-select children
              </p>
            </div>
            <CustomSelectOption
              mode="multiple"
              options={fileSystemTree}
              value={strictValue}
              onChange={(val) => setStrictValue(val as string[])}
              placeholder="Select independently..."
              treeMode
              treeCheckable
              treeCheckStrictly
              showChips
              maxTagCount={4}
            />
            <div className="text-xs text-muted-foreground">
              <p>Try selecting folders and files independently</p>
              <p className="font-mono">{strictValue.join(", ") || "none"}</p>
            </div>
          </Card>
        </div>

        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Tree Select Features</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Unlimited nesting depth</li>
              <li>Expand/collapse nodes</li>
              <li>Parent-child selection linking</li>
              <li>Strict mode (independent selection)</li>
              <li>Single or multiple selection</li>
              <li>Checkbox mode control</li>
              <li>Tree line connections</li>
            </ul>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Default expand all option</li>
              <li>Controlled expanded keys</li>
              <li>Search across all levels</li>
              <li>Custom icons per level</li>
              <li>Lazy loading support</li>
              <li>Keyboard navigation</li>
              <li>Fully accessible</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
