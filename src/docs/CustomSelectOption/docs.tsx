import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/documentation">Back to Demo</Link>
          </Button>
          <h1 className="text-5xl font-bold text-balance">Advanced Select Documentation</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Complete API reference and usage guide for the Advanced Select component
          </p>
        </div>

        {/* Installation */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Installation</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Install the component and its dependencies:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">npm install lucide-react @radix-ui/react-popover cmdk</code>
            </pre>
          </div>
        </Card>

        {/* Props */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Props API</h2>

          {/* Core Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Core Props <Badge variant="secondary">Essential</Badge>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Prop</th>
                    <th className="text-left py-2 px-4 font-semibold">Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Default</th>
                    <th className="text-left py-2 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">options</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">SelectOption[]</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">[]</code>
                    </td>
                    <td className="py-2 px-4">Array of options to display</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">value</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string | string[]</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Selected value(s)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">onChange</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(value) =&gt; void</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Callback when selection changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">placeholder</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">"Select option..."</code>
                    </td>
                    <td className="py-2 px-4">Placeholder text</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">mode</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">"single" | "multiple"</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">"single"</code>
                    </td>
                    <td className="py-2 px-4">Selection mode</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Search Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Search & Filter Props <Badge variant="secondary">Search</Badge>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Prop</th>
                    <th className="text-left py-2 px-4 font-semibold">Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Default</th>
                    <th className="text-left py-2 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">searchable</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">true</code>
                    </td>
                    <td className="py-2 px-4">Enable search functionality</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">searchPlaceholder</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">"Search..."</code>
                    </td>
                    <td className="py-2 px-4">Search input placeholder</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">onSearch</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(search: string) =&gt; void</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Callback when search changes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">filterOption</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(option, search) =&gt; boolean</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Custom filter function</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Async Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Async & Server-side Props <Badge variant="secondary">Async</Badge>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Prop</th>
                    <th className="text-left py-2 px-4 font-semibold">Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Default</th>
                    <th className="text-left py-2 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">loading</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">false</code>
                    </td>
                    <td className="py-2 px-4">Show loading state</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">serverSide</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">false</code>
                    </td>
                    <td className="py-2 px-4">Enable server-side search</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">onServerSearch</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(search) =&gt; Promise&lt;SelectOption[]&gt;</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Server search function</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">debounceTime</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">number</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">300</code>
                    </td>
                    <td className="py-2 px-4">Debounce delay in ms</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">onLoadMore</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">() =&gt; void</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Lazy loading callback</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">hasMore</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">false</code>
                    </td>
                    <td className="py-2 px-4">More items available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Display Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Display Props <Badge variant="secondary">UI</Badge>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Prop</th>
                    <th className="text-left py-2 px-4 font-semibold">Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Default</th>
                    <th className="text-left py-2 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">showChips</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">true</code>
                    </td>
                    <td className="py-2 px-4">Display as chips in multiple mode</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">showCount</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">false</code>
                    </td>
                    <td className="py-2 px-4">Show count instead of chips</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">maxTagCount</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">number</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Max chips to display</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">maxTagTextLength</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">number</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">20</code>
                    </td>
                    <td className="py-2 px-4">Max characters in chip text</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">allowClear</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">true</code>
                    </td>
                    <td className="py-2 px-4">Show clear button</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Styling Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Styling Props <Badge variant="secondary">Style</Badge>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Prop</th>
                    <th className="text-left py-2 px-4 font-semibold">Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Default</th>
                    <th className="text-left py-2 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">className</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Trigger className</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">triggerClassName</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Additional trigger classes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">popoverClassName</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Popover wrapper classes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">contentClassName</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Command content classes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">autoWidth</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">false</code>
                    </td>
                    <td className="py-2 px-4">Match dropdown to trigger width</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">width</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string | number</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Custom trigger width</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">maxHeight</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string | number</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">"300px"</code>
                    </td>
                    <td className="py-2 px-4">Dropdown max height</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">position</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">"top" | "bottom" | "left" | "right"</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">"bottom"</code>
                    </td>
                    <td className="py-2 px-4">Dropdown position</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Error Handling Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Error Handling Props <Badge variant="destructive">New</Badge>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Prop</th>
                    <th className="text-left py-2 px-4 font-semibold">Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Default</th>
                    <th className="text-left py-2 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">error</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string | boolean</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Error state or message</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">errorMessage</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Custom error message</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">required</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">false</code>
                    </td>
                    <td className="py-2 px-4">Mark as required field</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">validateOnChange</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(value) =&gt; string | undefined</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Validation function</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Create Option Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Create Option Props <Badge variant="destructive">New</Badge>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Prop</th>
                    <th className="text-left py-2 px-4 font-semibold">Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Default</th>
                    <th className="text-left py-2 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">allowCreate</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">boolean</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">false</code>
                    </td>
                    <td className="py-2 px-4">Allow creating new options</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">createText</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">"Create"</code>
                    </td>
                    <td className="py-2 px-4">Create button text</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">onCreateOption</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(input) =&gt; SelectOption | Promise&lt;SelectOption&gt;</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Create new option handler</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">onCreateClick</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(input) =&gt; void</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Alternative create handler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Advanced Props */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Advanced Props <Badge variant="secondary">Advanced</Badge>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold">Prop</th>
                    <th className="text-left py-2 px-4 font-semibold">Type</th>
                    <th className="text-left py-2 px-4 font-semibold">Default</th>
                    <th className="text-left py-2 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">groupBy</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">string</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Group options by property</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">sortOptions</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(a, b) =&gt; number</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Custom sort function</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">renderOption</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(option) =&gt; ReactNode</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Custom option renderer</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <code className="text-xs">renderTrigger</code>
                    </td>
                    <td className="py-2 px-4">
                      <code className="text-xs">(selected) =&gt; ReactNode</code>
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">Custom trigger renderer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* SelectOption Interface */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">SelectOption Interface</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`interface SelectOption {
  value: string                // Unique value
  label: string                // Display text
  disabled?: boolean           // Disable option
  icon?: React.ReactNode       // Option icon
  description?: string         // Secondary text
  group?: string              // Group name
  [key: string]: any          // Custom properties
}`}
            </code>
          </pre>
        </Card>

        {/* Quick Start */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Basic Usage</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  {`import { AdvancedSelect } from '@/components/ui/advanced-select'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
]

function MyComponent() {
  const [value, setValue] = useState('')
  
  return (
    <AdvancedSelect
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select a fruit"
    />
  )
}`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Multiple Selection</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  {`<AdvancedSelect
  mode="multiple"
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  showChips
  maxTagCount={3}
/>`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Server-side Search</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  {`const fetchUsers = async (search: string) => {
  const response = await fetch(\`/api/users?search=\${search}\`)
  return response.json()
}

<AdvancedSelect
  serverSide
  onServerSearch={fetchUsers}
  value={userId}
  onChange={setUserId}
  debounceTime={300}
/>`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">With Validation</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  {`const validate = (value: string | string[]) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return 'Please select at least one option'
  }
  return undefined
}

<AdvancedSelect
  options={options}
  value={value}
  onChange={setValue}
  validateOnChange={validate}
  required
/>`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Create New Options</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  {`const handleCreate = (input: string): SelectOption => {
  const newOption = {
    value: input.toLowerCase().replace(/\\s+/g, '-'),
    label: input
  }
  // Add to your options state
  setOptions([...options, newOption])
  return newOption
}

<AdvancedSelect
  options={options}
  value={value}
  onChange={setValue}
  allowCreate
  onCreateOption={handleCreate}
/>`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Grouped Options</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  {`const techOptions = [
  { value: 'react', label: 'React', group: 'Frameworks' },
  { value: 'vue', label: 'Vue', group: 'Frameworks' },
  { value: 'ts', label: 'TypeScript', group: 'Languages' },
  { value: 'js', label: 'JavaScript', group: 'Languages' }
]

<AdvancedSelect
  options={techOptions}
  value={value}
  onChange={setValue}
  groupBy="group"
/>`}
                </code>
              </pre>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button asChild variant="default">
            <Link to="/examples">View 100+ Examples</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/documentation">Back to Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
