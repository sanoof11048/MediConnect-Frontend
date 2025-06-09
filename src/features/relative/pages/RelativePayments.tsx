import { Check } from 'lucide-react'
import  { useState } from 'react'

function RelativePayments() {
      const [payments] = useState([
        { id: 1, nurseName: 'Sarah Johnson', hours: 40, rate: 35, amount: 1400, period: 'Week 1 - June 2025', status: 'Paid' },
        { id: 2, nurseName: 'Mike Davis', hours: 35, rate: 32, amount: 1120, period: 'Week 1 - June 2025', status: 'Pending' },
        { id: 3, nurseName: 'Sarah Johnson', hours: 38, rate: 35, amount: 1330, period: 'Week 2 - June 2025', status: 'Pending' }
      ]);
  return (
 <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Financial Management</h3>
                  <p className="text-gray-600">Track payments and manage wages</p>
                </div>
                <button className="px-6 py-3 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ backgroundColor: '#3aba90' }}>
                  Generate Report
                </button>
              </div>
              
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="grid grid-cols-7 gap-4 font-semibold text-gray-700 text-sm">
                    <div>Nurse</div>
                    <div>Period</div>
                    <div>Hours</div>
                    <div>Rate</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Action</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {payments.map(payment => (
                    <div key={payment.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="grid grid-cols-7 gap-4 items-center">
                        <div className="font-medium text-gray-900">{payment.nurseName}</div>
                        <div className="text-gray-600">{payment.period}</div>
                        <div className="text-gray-600">{payment.hours}h</div>
                        <div className="text-gray-600">${payment.rate}/hr</div>
                        <div className="font-bold text-gray-900">${payment.amount}</div>
                        <div>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                        <div>
                          {payment.status === 'Pending' && (
                            <button
                            //   onClick={() => handlePayWages(payment.id)}
                              className="px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors"
                              style={{ backgroundColor: '#3aba90' }}
                            >
                              Pay Now
                            </button>
                          )}
                          {payment.status === 'Paid' && (
                            <span className="text-green-600 flex items-center font-medium">
                              <Check size={16} className="mr-1" />
                              Paid
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>  )
}

export default RelativePayments