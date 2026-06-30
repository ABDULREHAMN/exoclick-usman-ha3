"use client"

import { Check, Copy, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip" // Ensure Tooltip components are imported

export function WithdrawalHistory() {
  const withdrawals = [
    {
      date: "May 16, 2026",
      method: "Payoneer",
      amount: 498.21,
      status: "completed",
      details: "safdarhussainsonazir@gmail.com",
      isVerified: true,
    },
    {
      date: "Jun 05, 2026",
      method: "Payoneer",
      amount: 1050.33,
      status: "cancelled",
      details: "safdarhussainsonazir@gmail.com",
      isVerified: true,
    },
    {
      date: "Jun 16, 2026",
      method: "Payoneer",
      amount: 1322.22,
      status: "cancelled",
      details: "safdarhussainsonazir@gmail.com",
      isVerified: true,
    },
  ]

  const totalWithdrawn = withdrawals.reduce((sum, withdrawal) => sum + withdrawal.amount, 0)

  return (
    <Card className="p-4">
      <h2 className="text-lg font-medium mb-4">Withdrawal History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Method</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-sm">Address / Email</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal, index) => (
              <WithdrawalRow
                key={index}
                date={withdrawal.date}
                method={withdrawal.method}
                amount={`$${withdrawal.amount.toFixed(2)}`}
                status={withdrawal.status as "withdrawn" | "scheduled" | "failed" | "confirmed"}
                details={withdrawal.details}
                isVerified={withdrawal.isVerified}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right text-lg font-semibold">
        Total Withdrawn: <span className="text-green-600">${totalWithdrawn.toFixed(2)}</span>
      </div>
    </Card>
  )
}

interface WithdrawalRowProps {
  date: string
  method: string
  amount: string
  status: "withdrawn" | "scheduled" | "failed" | "confirmed" | "pending" | "completed"
  details: string
  isVerified?: boolean
}

function WithdrawalRow({ date, method, amount, status, details, isVerified }: WithdrawalRowProps) {
  const statusConfig = {
    withdrawn: { icon: Check, color: "text-green-500 bg-green-50", label: "Withdrawn" },
    completed: { icon: CheckCircle, color: "text-amber-600 bg-amber-100", label: "Completed" },
    pending: { icon: Clock, color: "text-amber-600 bg-amber-100", label: "Pending" },
    confirmed: { icon: CheckCircle, color: "text-green-500 bg-green-50", label: "Confirmed" },
    scheduled: { icon: Clock, color: "text-yellow-500 bg-yellow-50", label: "Pending" },
    failed: { icon: AlertTriangle, color: "text-red-500 bg-red-50", label: "Failed" },
  }

  const StatusIcon = statusConfig[status].icon

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm font-medium">{method}</td>
      <td className="py-3 px-4 text-sm font-medium">{amount}</td>
      <td className="py-3 px-4">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusConfig[status].color}`}>
          <StatusIcon size={12} className="mr-1" />
          <span>{statusConfig[status].label}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm">
        {details.startsWith("0x") ? (
          // Hide wallet address in withdrawal history for crypto
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Crypto Wallet</span>
            {isVerified && (
              <Badge className="bg-green-100 text-green-800 text-xs flex items-center">
                <CheckCircle size={10} className="mr-1" />
                Verified
              </Badge>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{details}</span>
            {isVerified && (
              <Badge className="bg-green-100 text-green-800 text-xs flex items-center">
                <CheckCircle size={10} className="mr-1" />
                Verified
              </Badge>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(details)}>
                    <Copy size={12} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy email address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </td>
    </tr>
  )
}
