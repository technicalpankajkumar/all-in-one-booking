"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { CustomSelectOption } from "@/components/custom-ui/CustomSelectOption"
import { Search, User, FileText, Check, Copy, ExternalLink, ChevronRight, Star, Palette } from "lucide-react"
import { Link } from "react-router-dom"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/documentation">
                <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Demo
              </Link>
            </Button>
            <div className="flex gap-2">
              <Badge variant="secondary">v2.0</Badge>
              <Badge>Latest</Badge>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 text-balance">Advanced Select</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl">
            A powerful, feature-rich select component with support for single/multiple selection, tree structures, lazy
            loading, server-side search, and much more.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start h-auto rounded-none border-none bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="api"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                API Reference
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Examples
              </TabsTrigger>
              <TabsTrigger
                value="guides"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Guides
              </TabsTrigger>
            </TabsList>

            {/* Content */}
            <div className="py-8">
              <TabsContent value="overview">
                <OverviewSection />
              </TabsContent>
              <TabsContent value="api">
                <APISection />
              </TabsContent>
              <TabsContent value="examples">
                <ExamplesSection />
              </TabsContent>
              <TabsContent value="guides">
                <GuidesSection />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="space-y-8">
      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Quick Start</h2>
        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
            <CardDescription>Install the component and its dependencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock code={`npm install lucide-react @radix-ui/react-popover cmdk`} language="bash" />
            <p className="text-sm text-muted-foreground">Copy the component files to your project:</p>
            <CodeBlock
              code={`components/ui/advanced-select.tsx
hooks/use-debounce.ts`}
              language="bash"
            />
          </CardContent>
        </Card>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Basic Usage</h2>
        <LiveExample
          title="Single Select"
          description="Simple single selection dropdown"
          code={`import { CustomSelectOption } from '@/components/ui/advanced-select'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
]

function MyComponent() {
  const [value, setValue] = useState('')
  
  return (
    <CustomSelectOption
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select a fruit"
    />
  )
}`}
          preview={<BasicSelectDemo />}
        />
      </section>

      {/* Features Grid */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Check className="h-5 w-5" />}
            title="Multiple Selection"
            description="Select multiple items with chip display and count indicators"
          />
          <FeatureCard
            icon={<Search className="h-5 w-5" />}
            title="Searchable"
            description="Built-in search with custom filter functions and debouncing"
          />
          <FeatureCard
            icon={<FileText className="h-5 w-5" />}
            title="Tree Select"
            description="Hierarchical data with parent-child relationships and expand/collapse"
          />
          <FeatureCard
            icon={<ExternalLink className="h-5 w-5" />}
            title="Async Loading"
            description="Server-side search, lazy loading, and infinite scroll support"
          />
          <FeatureCard
            icon={<Star className="h-5 w-5" />}
            title="Create Options"
            description="Allow users to create new options on-the-fly with modal support"
          />
          <FeatureCard
            icon={<Palette className="h-5 w-5" />}
            title="Highly Customizable"
            description="Custom icons, rendering, styling, and size variants"
          />
        </div>
      </section>

      {/* Size Variants */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Size Variants</h2>
        <LiveExample
          title="Different Sizes"
          description="Component supports sm, md, lg, and xl sizes"
          code={`<CustomSelectOption size="sm" placeholder="Small" />
<CustomSelectOption size="md" placeholder="Medium (Default)" />
<CustomSelectOption size="lg" placeholder="Large" />
<CustomSelectOption size="xl" placeholder="Extra Large" />`}
          preview={<SizeVariantsDemo />}
        />
      </section>
    </div>
  )
}

function APISection() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">API Reference</h2>
        <p className="text-muted-foreground">
          Complete reference of all props, types, and interfaces for the Advanced Select component.
        </p>
      </section>

      {/* Core Props */}
      <PropsTable
        title="Core Props"
        badge="Essential"
        variant="default"
        props={[
          {
            name: "options",
            type: "SelectOption[]",
            default: "[]",
            description: "Array of options to display in the dropdown",
          },
          {
            name: "value",
            type: "string | string[]",
            default: "undefined",
            description: "Currently selected value(s)",
          },
          {
            name: "onChange",
            type: "(value: string | string[]) => void",
            default: "undefined",
            description: "Callback when selection changes",
          },
          {
            name: "placeholder",
            type: "string",
            default: '"Select option..."',
            description: "Placeholder text when nothing is selected",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Disable the entire component",
          },
          {
            name: "size",
            type: '"sm" | "md" | "lg" | "xl"',
            default: '"md"',
            description: "Component size variant",
          },
          {
            name: "mode",
            type: '"single" | "multiple" | "tags"',
            default: '"single"',
            description: "Selection mode",
          },
        ]}
      />

      {/* Search Props */}
      <PropsTable
        title="Search & Filter Props"
        badge="Search"
        variant="secondary"
        props={[
          {
            name: "searchable",
            type: "boolean",
            default: "true",
            description: "Enable search functionality",
          },
          {
            name: "searchPlaceholder",
            type: "string",
            default: '"Search..."',
            description: "Placeholder for search input",
          },
          {
            name: "onSearch",
            type: "(search: string) => void",
            default: "undefined",
            description: "Callback when search value changes",
          },
          {
            name: "filterOption",
            type: "(option: SelectOption, search: string) => boolean",
            default: "undefined",
            description: "Custom filter function for options",
          },
        ]}
      />

      {/* Async Props */}
      <PropsTable
        title="Async & Server-side Props"
        badge="Async"
        variant="secondary"
        props={[
          {
            name: "loading",
            type: "boolean",
            default: "false",
            description: "Show loading state",
          },
          {
            name: "serverSide",
            type: "boolean",
            default: "false",
            description: "Enable server-side search",
          },
          {
            name: "onServerSearch",
            type: "(search: string) => Promise<SelectOption[]>",
            default: "undefined",
            description: "Async function for server-side search",
          },
          {
            name: "debounceTime",
            type: "number",
            default: "300",
            description: "Debounce delay in milliseconds",
          },
          {
            name: "onLoadMore",
            type: "() => void",
            default: "undefined",
            description: "Callback for lazy loading more options",
          },
          {
            name: "hasMore",
            type: "boolean",
            default: "false",
            description: "Whether more options can be loaded",
          },
        ]}
      />

      {/* Display Props */}
      <PropsTable
        title="Display Props"
        badge="UI"
        variant="secondary"
        props={[
          {
            name: "showChips",
            type: "boolean",
            default: "true",
            description: "Show selected items as chips (badges)",
          },
          {
            name: "showCount",
            type: "boolean",
            default: "false",
            description: "Show count of selected items instead of chips",
          },
          {
            name: "maxTagCount",
            type: "number",
            default: "undefined",
            description: "Maximum number of chips to display",
          },
          {
            name: "maxTagTextLength",
            type: "number",
            default: "20",
            description: "Maximum length of chip text before truncation",
          },
          {
            name: "allowClear",
            type: "boolean",
            default: "true",
            description: "Show clear button to remove all selections",
          },
        ]}
      />

      {/* Icon Props */}
      <PropsTable
        title="Icon Props"
        badge="Icons"
        variant="secondary"
        props={[
          {
            name: "prefixIcon",
            type: "React.ReactNode",
            default: "undefined",
            description: "Icon to display before the selected value",
          },
          {
            name: "suffixIcon",
            type: "React.ReactNode",
            default: "<ChevronsUpDown />",
            description: "Icon to display after the selected value",
          },
          {
            name: "clearIcon",
            type: "React.ReactNode",
            default: "<X />",
            description: "Custom clear button icon",
          },
          {
            name: "removeIcon",
            type: "React.ReactNode",
            default: "<X />",
            description: "Icon for removing individual chips",
          },
        ]}
      />

      {/* Tree Props */}
      <PropsTable
        title="Tree Select Props"
        badge="Tree"
        variant="destructive"
        props={[
          {
            name: "treeMode",
            type: "boolean",
            default: "false",
            description: "Enable tree select mode for hierarchical data",
          },
          {
            name: "treeCheckable",
            type: "boolean",
            default: "true",
            description: "Show checkboxes in tree mode",
          },
          {
            name: "treeDefaultExpandAll",
            type: "boolean",
            default: "false",
            description: "Expand all tree nodes by default",
          },
          {
            name: "treeExpandedKeys",
            type: "string[]",
            default: "undefined",
            description: "Controlled expanded keys",
          },
          {
            name: "onTreeExpand",
            type: "(expandedKeys: string[]) => void",
            default: "undefined",
            description: "Callback when tree nodes expand/collapse",
          },
          {
            name: "showTreeLine",
            type: "boolean",
            default: "false",
            description: "Show connecting lines in tree structure",
          },
          {
            name: "treeCheckStrictly",
            type: "boolean",
            default: "false",
            description: "Enable independent parent-child selection",
          },
        ]}
      />

      {/* Error Props */}
      <PropsTable
        title="Error & Validation Props"
        badge="Validation"
        variant="destructive"
        props={[
          {
            name: "error",
            type: "string | boolean",
            default: "undefined",
            description: "Error state or error message",
          },
          {
            name: "errorMessage",
            type: "string",
            default: "undefined",
            description: "Error message to display",
          },
          {
            name: "required",
            type: "boolean",
            default: "false",
            description: "Mark field as required",
          },
          {
            name: "validateOnChange",
            type: "(value: string | string[]) => string | undefined",
            default: "undefined",
            description: "Custom validation function",
          },
        ]}
      />

      {/* Create Option Props */}
      <PropsTable
        title="Create Option Props"
        badge="Create"
        variant="destructive"
        props={[
          {
            name: "allowCreate",
            type: "boolean",
            default: "false",
            description: "Allow users to create new options",
          },
          {
            name: "createText",
            type: "string",
            default: '"Create"',
            description: "Text for create button",
          },
          {
            name: "onCreateOption",
            type: "(input: string) => SelectOption | Promise<SelectOption>",
            default: "undefined",
            description: "Handle creating new option",
          },
          {
            name: "onCreateClick",
            type: "(input: string) => void",
            default: "undefined",
            description: "Handle create button click (for modal)",
          },
          {
            name: "createModalContent",
            type: "(input: string, onConfirm: (option: SelectOption) => void) => React.ReactNode",
            default: "undefined",
            description: "Custom content for create modal",
          },
        ]}
      />

      {/* SelectOption Interface */}
      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>SelectOption Interface</CardTitle>
            <CardDescription>Type definition for option objects</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock
              code={`interface SelectOption {
  value: string              // Unique identifier for the option
  label: string              // Display text for the option
  disabled?: boolean         // Disable this option
  icon?: React.ReactNode     // Icon to display with the option
  description?: string       // Secondary text below the label
  group?: string            // Group name for grouped options
  children?: SelectOption[]  // Child options for tree select
  parent?: string           // Parent value for tree select
  level?: number            // Nesting level in tree
  isLeaf?: boolean          // Whether this is a leaf node
  category?: string         // Category for filtering
  tags?: string[]           // Tags for additional filtering
  metadata?: Record<string, any>  // Any custom metadata
  [key: string]: any        // Support for custom properties
}`}
              language="typescript"
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function ExamplesSection() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">100+ Examples</h2>
        <p className="text-muted-foreground">
          Comprehensive collection of usage examples covering all features and use cases.
        </p>
      </section>

      {/* Basic Examples */}
      <ExampleCategory title="Basic Examples" count={15}>
        <LiveExample
          title="1. Simple Select"
          code={`<CustomSelectOption
  options={fruits}
  value={value}
  onChange={setValue}
  placeholder="Select a fruit"
/>`}
          preview={<Example1 />}
        />

        <LiveExample
          title="2. With Prefix Icon"
          code={`<CustomSelectOption
  options={users}
  value={value}
  onChange={setValue}
  prefixIcon={<User className="h-4 w-4" />}
  placeholder="Select user"
/>`}
          preview={<Example2 />}
        />

        <LiveExample
          title="3. Multiple Selection"
          code={`<CustomSelectOption
  mode="multiple"
  options={colors}
  value={selected}
  onChange={setSelected}
  placeholder="Select colors"
/>`}
          preview={<Example3 />}
        />

        <LiveExample
          title="4. With Descriptions"
          code={`<CustomSelectOption
  options={[
    { value: 'react', label: 'React', description: 'A JavaScript library for building UIs' },
    { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' }
  ]}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example4 />}
        />

        <LiveExample
          title="5. Disabled Options"
          code={`<CustomSelectOption
  options={[
    { value: 'option1', label: 'Available' },
    { value: 'option2', label: 'Disabled', disabled: true }
  ]}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example5 />}
        />
      </ExampleCategory>

      {/* Size Variants */}
      <ExampleCategory title="Size Variants" count={4}>
        <LiveExample
          title="6. Small Size"
          code={`<CustomSelectOption size="sm" options={options} placeholder="Small select" />`}
          preview={<Example6 />}
        />

        <LiveExample
          title="7. Medium Size (Default)"
          code={`<CustomSelectOption size="md" options={options} placeholder="Medium select" />`}
          preview={<Example7 />}
        />

        <LiveExample
          title="8. Large Size"
          code={`<CustomSelectOption size="lg" options={options} placeholder="Large select" />`}
          preview={<Example8 />}
        />

        <LiveExample
          title="9. Extra Large Size"
          code={`<CustomSelectOption size="xl" options={options} placeholder="Extra large select" />`}
          preview={<Example9 />}
        />
      </ExampleCategory>

      {/* Display Modes */}
      <ExampleCategory title="Display Modes" count={8}>
        <LiveExample
          title="10. Chips Display"
          code={`<CustomSelectOption
  mode="multiple"
  showChips
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example10 />}
        />

        <LiveExample
          title="11. Count Display"
          code={`<CustomSelectOption
  mode="multiple"
  showCount
  showChips={false}
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example11 />}
        />

        <LiveExample
          title="12. Max Tag Count"
          code={`<CustomSelectOption
  mode="multiple"
  showChips
  maxTagCount={2}
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example12 />}
        />

        <LiveExample
          title="13. Custom Tag Length"
          code={`<CustomSelectOption
  mode="multiple"
  showChips
  maxTagTextLength={10}
  options={longOptions}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example13 />}
        />
      </ExampleCategory>

      {/* Search & Filter */}
      <ExampleCategory title="Search & Filter" count={12}>
        <LiveExample
          title="14. Searchable"
          code={`<CustomSelectOption
  searchable
  options={countries}
  value={value}
  onChange={setValue}
  placeholder="Search countries..."
/>`}
          preview={<Example14 />}
        />

        <LiveExample
          title="15. Custom Filter"
          code={`<CustomSelectOption
  searchable
  options={products}
  filterOption={(option, search) => 
    option.label.toLowerCase().includes(search.toLowerCase()) ||
    option.tags?.some(tag => tag.includes(search))
  }
  value={value}
  onChange={setValue}
/>`}
          preview={<Example15 />}
        />

        <LiveExample
          title="16. Server-side Search"
          code={`<CustomSelectOption
  serverSide
  onServerSearch={fetchUsers}
  debounceTime={300}
  value={value}
  onChange={setValue}
  placeholder="Search users..."
/>`}
          preview={<Example16 />}
        />
      </ExampleCategory>

      {/* Tree Select */}
      <ExampleCategory title="Tree Select" count={10}>
        <LiveExample
          title="17. Basic Tree"
          code={`<CustomSelectOption
  treeMode
  options={fileSystem}
  value={value}
  onChange={setValue}
  placeholder="Select file or folder"
/>`}
          preview={<Example17 />}
        />

        <LiveExample
          title="18. Tree with Checkboxes"
          code={`<CustomSelectOption
  mode="multiple"
  treeMode
  treeCheckable
  options={departments}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example18 />}
        />

        <LiveExample
          title="19. Tree Strict Mode"
          code={`<CustomSelectOption
  mode="multiple"
  treeMode
  treeCheckStrictly
  options={permissions}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example19 />}
        />
      </ExampleCategory>

      {/* Async & Loading */}
      <ExampleCategory title="Async & Loading" count={10}>
        <LiveExample
          title="20. Loading State"
          code={`<CustomSelectOption
  loading
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Loading..."
/>`}
          preview={<Example20 />}
        />

        <LiveExample
          title="21. Lazy Loading"
          code={`<CustomSelectOption
  options={options}
  onLoadMore={loadMore}
  hasMore={hasMore}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example21 />}
        />
      </ExampleCategory>

      {/* Create Options */}
      <ExampleCategory title="Create Options" count={8}>
        <LiveExample
          title="22. Allow Create"
          code={`<CustomSelectOption
  allowCreate
  onCreateOption={(input) => ({
    value: input.toLowerCase(),
    label: input
  })}
  options={tags}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example22 />}
        />

        <LiveExample
          title="23. Create with Modal"
          code={`<CustomSelectOption
  allowCreate
  onCreateClick={handleCreateClick}
  options={items}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example23 />}
        />
      </ExampleCategory>

      {/* Error Handling */}
      <ExampleCategory title="Error Handling & Validation" count={10}>
        <LiveExample
          title="24. Error State"
          code={`<CustomSelectOption
  error
  errorMessage="This field is required"
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example24 />}
        />

        <LiveExample
          title="25. Custom Validation"
          code={`<CustomSelectOption
  validateOnChange={(value) => {
    if (!value) return 'Please select an option'
    return undefined
  }}
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example25 />}
        />

        <LiveExample
          title="26. Required Field"
          code={`<CustomSelectOption
  required
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Required field *"
/>`}
          preview={<Example26 />}
        />
      </ExampleCategory>

      {/* Styling & Customization */}
      <ExampleCategory title="Styling & Customization" count={15}>
        <LiveExample
          title="27. Custom Width"
          code={`<CustomSelectOption
  width={400}
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example27 />}
        />

        <LiveExample
          title="28. Auto Width"
          code={`<CustomSelectOption
  autoWidth
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example28 />}
        />

        <LiveExample
          title="29. Custom Position"
          code={`<CustomSelectOption
  position="top"
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example29 />}
        />

        <LiveExample
          title="30. Custom Classes"
          code={`<CustomSelectOption
  className="max-w-md"
  triggerClassName="bg-blue-50"
  popoverClassName="shadow-2xl"
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example30 />}
        />
      </ExampleCategory>

      {/* Advanced Features */}
      <ExampleCategory title="Advanced Features" count={18}>
        <LiveExample
          title="31. Grouped Options"
          code={`<CustomSelectOption
  options={[
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'node', label: 'Node.js', group: 'Backend' }
  ]}
  groupBy="group"
  value={value}
  onChange={setValue}
/>`}
          preview={<Example31 />}
        />

        <LiveExample
          title="32. Category Filter"
          code={`<CustomSelectOption
  categoryFilter
  showCategoryTabs
  categories={['All', 'Popular', 'Recent']}
  options={products}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example32 />}
        />

        <LiveExample
          title="33. Max Selection"
          code={`<CustomSelectOption
  mode="multiple"
  maxSelection={3}
  onMaxReached={() => alert('Max 3 items')}
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example33 />}
        />

        <LiveExample
          title="34. Min Selection"
          code={`<CustomSelectOption
  mode="multiple"
  minSelection={2}
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example34 />}
        />

        <LiveExample
          title="35. Before Change Hook"
          code={`<CustomSelectOption
  beforeChange={(value) => {
    return confirm('Are you sure?')
  }}
  options={options}
  value={value}
  onChange={setValue}
/>`}
          preview={<Example35 />}
        />
      </ExampleCategory>

      {/* Continue with more examples... */}
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">And 65+ more examples covering all features and use cases!</p>
        <Button asChild variant="outline">
          <Link to="/examples">View All 100+ Examples</Link>
        </Button>
      </div>
    </div>
  )
}

function GuidesSection() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Usage Guides</h2>
        <p className="text-muted-foreground">Step-by-step guides for common use cases and integration patterns.</p>
      </section>

      {/* Guide Cards */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn the basics of using the Advanced Select component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GuideStep
              number={1}
              title="Import the component"
              code={`import { CustomSelectOption, SelectOption } from '@/components/ui/advanced-select'`}
            />
            <GuideStep
              number={2}
              title="Define your options"
              code={`const options: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' }
]`}
            />
            <GuideStep
              number={3}
              title="Use the component"
              code={`const [value, setValue] = useState('')

return (
  <CustomSelectOption
    options={options}
    value={value}
    onChange={setValue}
  />
)`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server-side Integration</CardTitle>
            <CardDescription>Integrate with your backend API for dynamic data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GuideStep
              number={1}
              title="Create API route"
              code={`// app/api/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  const results = await db.query(
    'SELECT * FROM items WHERE name ILIKE $1',
    ['%' + query + '%']
  )
  
  return Response.json(results.rows)
}`}
            />
            <GuideStep
              number={2}
              title="Create fetch function"
              code={`const fetchOptions = async (search: string): Promise<SelectOption[]> => {
  const response = await fetch(\`/api/search?q=\${encodeURIComponent(search)}\`)
  const data = await response.json()
  
  return data.map(item => ({
    value: item.id,
    label: item.name,
    description: item.description
  }))
}`}
            />
            <GuideStep
              number={3}
              title="Use with component"
              code={`<CustomSelectOption
  serverSide
  onServerSearch={fetchOptions}
  debounceTime={300}
  value={selectedId}
  onChange={setSelectedId}
  placeholder="Search items..."
/>`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Integration</CardTitle>
            <CardDescription>Use with React Hook Form or other form libraries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GuideStep number={1} title="Install React Hook Form" code={`npm install react-hook-form`} />
            <GuideStep
              number={2}
              title="Create form with validation"
              code={`import { useForm, Controller } from 'react-hook-form'

const form = useForm({
  defaultValues: {
    category: '',
    tags: []
  }
})

<form onSubmit={form.handleSubmit(onSubmit)}>
  <Controller
    name="category"
    control={form.control}
    rules={{ required: 'Category is required' }}
    render={({ field, fieldState }) => (
      <CustomSelectOption
        {...field}
        options={categories}
        error={!!fieldState.error}
        errorMessage={fieldState.error?.message}
        placeholder="Select category"
      />
    )}
  />
  
  <Controller
    name="tags"
    control={form.control}
    render={({ field }) => (
      <CustomSelectOption
        {...field}
        mode="multiple"
        options={tags}
        placeholder="Select tags"
      />
    )}
  />
</form>`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tree Data Structure</CardTitle>
            <CardDescription>Working with hierarchical data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GuideStep
              number={1}
              title="Prepare tree data"
              code={`const treeData: SelectOption[] = [
  {
    value: 'folder1',
    label: 'Documents',
    children: [
      { value: 'file1', label: 'Resume.pdf', isLeaf: true },
      { value: 'file2', label: 'Cover Letter.docx', isLeaf: true }
    ]
  },
  {
    value: 'folder2',
    label: 'Images',
    children: [
      { value: 'file3', label: 'Photo.jpg', isLeaf: true }
    ]
  }
]`}
            />
            <GuideStep
              number={2}
              title="Use tree mode"
              code={`<CustomSelectOption
  treeMode
  treeCheckable
  mode="multiple"
  options={treeData}
  value={selectedFiles}
  onChange={setSelectedFiles}
  placeholder="Select files and folders"
/>`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Rendering</CardTitle>
            <CardDescription>Customize option and trigger display</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GuideStep
              number={1}
              title="Custom option renderer"
              code={`<CustomSelectOption
  options={users}
  renderOption={(option) => (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={option.metadata?.avatar || "/placeholder.svg"} />
        <AvatarFallback>{option.label[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{option.label}</div>
        <div className="text-xs text-muted-foreground">
          {option.metadata?.email}
        </div>
      </div>
    </div>
  )}
  value={userId}
  onChange={setUserId}
/>`}
            />
            <GuideStep
              number={2}
              title="Custom trigger renderer"
              code={`<CustomSelectOption
  options={status}
  renderTrigger={(selected) => {
    const option = selected[0]
    if (!option) return <span>Select status</span>
    
    return (
      <div className="flex items-center gap-2">
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: option.metadata?.color }}
        />
        <span>{option.label}</span>
      </div>
    )
  }}
  value={currentStatus}
  onChange={setCurrentStatus}
/>`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Optimization</CardTitle>
            <CardDescription>Tips for handling large datasets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">1. Use Server-side Search</h4>
              <p className="text-sm text-muted-foreground">
                For datasets with 1000+ items, always use server-side search to avoid loading all options at once.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Implement Lazy Loading</h4>
              <p className="text-sm text-muted-foreground">
                Use <code>onLoadMore</code> and <code>hasMore</code> props to load options in batches.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Optimize Debounce Time</h4>
              <p className="text-sm text-muted-foreground">
                Increase <code>debounceTime</code> to 500-800ms for slow networks or expensive API calls.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">4. Memoize Options</h4>
              <p className="text-sm text-muted-foreground">
                Use <code>useMemo</code> to prevent unnecessary re-renders when options are computed.
              </p>
              <CodeBlock
                code={`const options = useMemo(() => {
  return data.map(item => ({
    value: item.id,
    label: item.name
  }))
}, [data])`}
                language="typescript"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accessibility Best Practices</CardTitle>
            <CardDescription>Making your select component accessible</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">1. Always Provide Labels</h4>
              <CodeBlock
                code={`<label htmlFor="country-select" className="block mb-2">
  Country
</label>
<CustomSelectOption
  id="country-select"
  options={countries}
  value={country}
  onChange={setCountry}
/>`}
                language="tsx"
              />
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">2. Use Semantic Placeholders</h4>
              <p className="text-sm text-muted-foreground">
                Avoid generic text like "Select..." - be specific: "Select your country"
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">3. Provide Error Messages</h4>
              <p className="text-sm text-muted-foreground">
                Always include clear error messages when validation fails.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">4. Support Keyboard Navigation</h4>
              <p className="text-sm text-muted-foreground">
                The component includes full keyboard support out of the box (Arrow keys, Enter, Escape, etc.)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Best Practices</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>Use server-side search for large datasets (1000+ items)</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>Provide meaningful placeholder text</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>Use descriptions for complex options</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>Implement proper validation and error handling</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>Memoize options when computed from props</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>Use appropriate size variants for your design</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="h-5 w-5 flex items-center justify-center text-red-500">✕</span>
                Don't
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="h-4 w-4 mt-0.5 text-red-500 shrink-0">✕</span>
                  <span>Load 10,000+ options at once without virtualization</span>
                </li>
                <li className="flex gap-2">
                  <span className="h-4 w-4 mt-0.5 text-red-500 shrink-0">✕</span>
                  <span>Use generic placeholders like "Select..."</span>
                </li>
                <li className="flex gap-2">
                  <span className="h-4 w-4 mt-0.5 text-red-500 shrink-0">✕</span>
                  <span>Forget to handle loading and error states</span>
                </li>
                <li className="flex gap-2">
                  <span className="h-4 w-4 mt-0.5 text-red-500 shrink-0">✕</span>
                  <span>Mix single and multiple selection modes dynamically</span>
                </li>
                <li className="flex gap-2">
                  <span className="h-4 w-4 mt-0.5 text-red-500 shrink-0">✕</span>
                  <span>Use tree mode for flat data structures</span>
                </li>
                <li className="flex gap-2">
                  <span className="h-4 w-4 mt-0.5 text-red-500 shrink-0">✕</span>
                  <span>Disable keyboard navigation or accessibility features</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Common Patterns */}
      <section className="space-y-4">
        <h3 className="text-2xl font-bold">Common Patterns</h3>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>User Selection with Avatar</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`const userOptions = users.map(user => ({
  value: user.id,
  label: user.name,
  description: user.email,
  icon: <Avatar><AvatarImage src={user.avatar || "/placeholder.svg"} /></Avatar>,
  metadata: { role: user.role }
}))

<CustomSelectOption
  options={userOptions}
  value={selectedUserId}
  onChange={setSelectedUserId}
  searchable
  prefixIcon={<User className="h-4 w-4" />}
  placeholder="Assign to user..."
/>`}
                language="tsx"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Selector with Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`const statusOptions = [
  { value: 'todo', label: 'To Do', metadata: { color: '#gray' } },
  { value: 'progress', label: 'In Progress', metadata: { color: '#blue' } },
  { value: 'done', label: 'Done', metadata: { color: '#green' } }
]

<CustomSelectOption
  options={statusOptions}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      <div 
        className="w-3 h-3 rounded-full" 
        style={{ backgroundColor: option.metadata?.color }}
      />
      {option.label}
    </div>
  )}
  value={status}
  onChange={setStatus}
/>`}
                language="tsx"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tag Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`<CustomSelectOption
  mode="multiple"
  allowCreate
  onCreateOption={(input) => {
    const newTag = {
      value: input.toLowerCase().replace(/\\s+/g, '-'),
      label: input
    }
    setTags(prev => [...prev, newTag])
    return newTag
  }}
  options={tags}
  value={selectedTags}
  onChange={setSelectedTags}
  showChips
  maxTagCount={5}
  placeholder="Add tags..."
/>`}
                language="tsx"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

// Helper Components
function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

function LiveExample({
  title,
  description,
  code,
  preview,
}: {
  title: string
  description?: string
  code: string
  preview: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-lg bg-background">{preview}</div>
        <CodeBlock code={code} />
      </CardContent>
    </Card>
  )
}

function PropsTable({
  title,
  badge,
  variant,
  props,
}: {
  title: string
  badge: string
  variant: "default" | "secondary" | "destructive"
  props: Array<{
    name: string
    type: string
    default: string
    description: string
  }>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          <Badge variant={variant}>{badge}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Prop</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Default</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop, index) => (
                <tr key={prop.name} className={index !== props.length - 1 ? "border-b" : ""}>
                  <td className="py-3 px-4 font-mono text-xs">{prop.name}</td>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{prop.type}</td>
                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">{prop.default}</td>
                  <td className="py-3 px-4 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

function ExampleCategory({
  title,
  count,
  children,
}: {
  title: string
  count: number
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-bold">{title}</h3>
        <Badge variant="secondary">{count} examples</Badge>
      </div>
      <div className="grid gap-6">{children}</div>
    </section>
  )
}

function GuideStep({
  number,
  title,
  code,
}: {
  number: number
  title: string
  code: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
          {number}
        </div>
        <h4 className="font-medium">{title}</h4>
      </div>
      <CodeBlock code={code} />
    </div>
  )
}

// Example Components (simplified for demonstration)
function BasicSelectDemo() {
  const [value, setValue] = useState("")
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ]
  return <CustomSelectOption options={options} value={value} onChange={setValue} placeholder="Select a fruit" />
}

function SizeVariantsDemo() {
  const [value, setValue] = useState("")
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]
  return (
    <div className="space-y-4">
      <CustomSelectOption size="sm" options={options} value={value} onChange={setValue} placeholder="Small" />
      <CustomSelectOption size="md" options={options} value={value} onChange={setValue} placeholder="Medium" />
      <CustomSelectOption size="lg" options={options} value={value} onChange={setValue} placeholder="Large" />
      <CustomSelectOption size="xl" options={options} value={value} onChange={setValue} placeholder="Extra Large" />
    </div>
  )
}

// Placeholder components for examples 1-35
function Example1() {
  const [value, setValue] = useState("")
  return <CustomSelectOption options={[{ value: "1", label: "Apple" }]} value={value} onChange={setValue} />
}

function Example2() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      prefixIcon={<User className="h-4 w-4" />}
      options={[{ value: "1", label: "John Doe" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example3() {
  const [value, setValue] = useState<string[]>([])
  return <CustomSelectOption mode="multiple" options={[{ value: "red", label: "Red" }]} value={value} onChange={setValue} />
}

function Example4() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      options={[{ value: "react", label: "React", description: "A JavaScript library" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example5() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      options={[
        { value: "1", label: "Available" },
        { value: "2", label: "Disabled", disabled: true },
      ]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example6() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      size="sm"
      options={[{ value: "1", label: "Small" }]}
      value={value}
      onChange={setValue}
      placeholder="Small"
    />
  )
}

function Example7() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      size="md"
      options={[{ value: "1", label: "Medium" }]}
      value={value}
      onChange={setValue}
      placeholder="Medium"
    />
  )
}

function Example8() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      size="lg"
      options={[{ value: "1", label: "Large" }]}
      value={value}
      onChange={setValue}
      placeholder="Large"
    />
  )
}

function Example9() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      size="xl"
      options={[{ value: "1", label: "XL" }]}
      value={value}
      onChange={setValue}
      placeholder="Extra Large"
    />
  )
}

function Example10() {
  const [value, setValue] = useState<string[]>([])
  return (
    <CustomSelectOption
      mode="multiple"
      showChips
      options={[{ value: "1", label: "Tag 1" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example11() {
  const [value, setValue] = useState<string[]>([])
  return (
    <CustomSelectOption
      mode="multiple"
      showCount
      showChips={false}
      options={[{ value: "1", label: "Item 1" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example12() {
  const [value, setValue] = useState<string[]>([])
  return (
    <CustomSelectOption
      mode="multiple"
      showChips
      maxTagCount={2}
      options={[{ value: "1", label: "Tag 1" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example13() {
  const [value, setValue] = useState<string[]>([])
  return (
    <CustomSelectOption
      mode="multiple"
      showChips
      maxTagTextLength={10}
      options={[{ value: "1", label: "Very Long Tag Name" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example14() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption searchable options={[{ value: "us", label: "United States" }]} value={value} onChange={setValue} />
  )
}

function Example15() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      searchable
      options={[{ value: "1", label: "Product", tags: ["tag1"] }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example16() {
  const [value, setValue] = useState("")
  return <CustomSelectOption serverSide options={[]} value={value} onChange={setValue} />
}

function Example17() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      treeMode
      options={[{ value: "1", label: "Folder", children: [] }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example18() {
  const [value, setValue] = useState<string[]>([])
  return <CustomSelectOption mode="multiple" treeMode treeCheckable options={[]} value={value} onChange={setValue} />
}

function Example19() {
  const [value, setValue] = useState<string[]>([])
  return <CustomSelectOption mode="multiple" treeMode treeCheckStrictly options={[]} value={value} onChange={setValue} />
}

function Example20() {
  const [value, setValue] = useState("")
  return <CustomSelectOption loading options={[]} value={value} onChange={setValue} />
}

function Example21() {
  const [value, setValue] = useState("")
  return <CustomSelectOption options={[{ value: "1", label: "Item 1" }]} hasMore value={value} onChange={setValue} />
}

function Example22() {
  const [value, setValue] = useState("")
  return <CustomSelectOption allowCreate options={[]} value={value} onChange={setValue} />
}

function Example23() {
  const [value, setValue] = useState("")
  return <CustomSelectOption allowCreate options={[]} value={value} onChange={setValue} />
}

function Example24() {
  const [value, setValue] = useState("")
  return <CustomSelectOption error errorMessage="Required" options={[]} value={value} onChange={setValue} />
}

function Example25() {
  const [value, setValue] = useState("")
  return <CustomSelectOption options={[]} value={value} onChange={setValue} />
}

function Example26() {
  const [value, setValue] = useState("")
  return <CustomSelectOption required options={[]} value={value} onChange={setValue} />
}

function Example27() {
  const [value, setValue] = useState("")
  return <CustomSelectOption width={400} options={[{ value: "1", label: "Item" }]} value={value} onChange={setValue} />
}

function Example28() {
  const [value, setValue] = useState("")
  return <CustomSelectOption autoWidth options={[{ value: "1", label: "Item" }]} value={value} onChange={setValue} />
}

function Example29() {
  const [value, setValue] = useState("")
  return <CustomSelectOption position="top" options={[{ value: "1", label: "Item" }]} value={value} onChange={setValue} />
}

function Example30() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption className="max-w-md" options={[{ value: "1", label: "Item" }]} value={value} onChange={setValue} />
  )
}

function Example31() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      groupBy="group"
      options={[{ value: "react", label: "React", group: "Frontend" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example32() {
  const [value, setValue] = useState("")
  return (
    <CustomSelectOption
      categoryFilter
      showCategoryTabs
      categories={["All", "Popular"]}
      options={[]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example33() {
  const [value, setValue] = useState<string[]>([])
  return (
    <CustomSelectOption
      mode="multiple"
      maxSelection={3}
      options={[{ value: "1", label: "Item 1" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example34() {
  const [value, setValue] = useState<string[]>([])
  return (
    <CustomSelectOption
      mode="multiple"
      minSelection={2}
      options={[{ value: "1", label: "Item 1" }]}
      value={value}
      onChange={setValue}
    />
  )
}

function Example35() {
  const [value, setValue] = useState("")
  return <CustomSelectOption options={[{ value: "1", label: "Item 1" }]} value={value} onChange={setValue} />
}
