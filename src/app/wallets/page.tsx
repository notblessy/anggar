import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WalletPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Wallet</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your wallet and account details will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
