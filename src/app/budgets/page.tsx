import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BudgetPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Budget</h1>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your monthly budget details will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
