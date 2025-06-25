declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useEffect, useState } from 'react';
import { Check, CreditCard, User, Calendar, AlertCircle, X, Loader2, Receipt, RefreshCw } from 'lucide-react';
import { useRelative } from '../../../context/RelativeContext';
import axiosAuth from '../../../api/axiosAuth';
const mockToast = {
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.log('Error:', message)
};

const RelativePayments = () => {
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [partialAmount, setPartialAmount] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'partial' | 'full'>('partial');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { payments, RelativeContextLoading, fetchPayments } = useRelative();

  useEffect(() => {
    fetchPayments();
    loadRazorpay();
  }, []);

  const loadRazorpay = () => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay SDK');
      mockToast.error('Payment gateway failed to load');
    };
    document.body.appendChild(script);
  };

 const handleRazorpayPayment = async (amount: number) => {
  if (!razorpayLoaded) {
    mockToast.error('Payment gateway not loaded');
    return;
  }

  try {
    console.log(selectedPayment)
    console.log(amount)
    const { data } = await axiosAuth.post('/Payment/create-razorpay-order', {
      assignmentId: selectedPayment.assignmentId,
      amount: amount,
      mode: 'Online',
    });


    const { orderId, razorpayKey } = data.data;

    const options = {
      key: razorpayKey,
      amount: amount * 100,
      currency: 'INR',
      name: 'Healthcare Services',
      description: `Payment for ${selectedPayment.nurseName} - ${selectedPayment.patientName}`,
      image: '/logo.svg', // Replace with actual logo if needed
      order_id: orderId,
      handler: async function (response: any) {
        await verifyRazorpayPayment(response, amount);
      },
      prefill: {
        name: selectedPayment.relativeName || '',
        email: selectedPayment.relativeEmail || 'example@email.com',
        contact: selectedPayment.relativePhone || '9999999999',
      },
      notes: {
        assignment_id: selectedPayment.assignmentId,
        nurse_name: selectedPayment.nurseName,
        patient_name: selectedPayment.patientName,
      },
      theme: {
        color: '#1a98cd',
      },
      modal: {
        ondismiss: () => {
          setIsPaying(false);
          mockToast.error('Payment cancelled');
        },
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  } catch (err: any) {
    console.error('🛑 Razorpay Init Error:', err);
    const message = err?.response?.data?.message || 'Failed to initiate payment in ';
    mockToast.error(message);
    setIsPaying(false);
  }
};
const verifyRazorpayPayment = async (response: any, amount: number) => {
  try {
    const verifyPayload = {
      assignmentId: selectedPayment.assignmentId,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      amount: amount,
      mode: 'Online',
    };

    await axiosAuth.post('/Payment/verify-razorpay-payment', verifyPayload);

    mockToast.success(`Payment of ₹${amount} successful`);
    setPartialAmount('');
    setSelectedPayment(null);
    setPaymentMode('partial');
    fetchPayments(); // Refresh payment status
  } catch (error: any) {
    console.error('🛑 Payment Verification Failed:', error);
    const msg = error?.response?.data?.message || 'Payment verification failed';
    mockToast.error(msg);
  } finally {
    setIsPaying(false);
  }
};



  const handlePayment = () => {
  const amount = paymentMode === 'full'
    ? selectedPayment.pendingAmount
    : parseFloat(partialAmount);

  if (!amount || isNaN(amount) || amount <= 0) {
    mockToast.error('Please enter a valid amount');
    return;
  }

  if (amount > selectedPayment.pendingAmount) {
    mockToast.error('Amount cannot exceed pending balance');
    return;
  }

  setIsPaying(true);
  handleRazorpayPayment(amount);
};


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'Partial':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'Pending':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'Paid') return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f0fdf4 100%)' }}>
      <div className="px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Dashboard</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                Manage your healthcare payments securely
              </p>
            </div>
            <button
              onClick={fetchPayments}
              disabled={RelativeContextLoading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${RelativeContextLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Outstanding</p>
                  <p className="text-2xl font-bold text-red-600">
                    ₹{payments.reduce((sum, p) => sum + p.pendingAmount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fee2e2' }}>
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                  <p className="text-2xl font-bold" style={{ color: '#3aba90' }}>
                    ₹{payments.reduce((sum, p) => sum + p.paidAmount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#d1fae5' }}>
                  <Check className="w-6 h-6" style={{ color: '#3aba90' }} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assignments Pending Payments</p>
                  <p className="text-2xl font-bold" style={{ color: '#1a98cd' }}>
                    {payments.filter(p => p.paymentStatus !== 'Paid').length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dbeafe' }}>
                  <User className="w-6 h-6" style={{ color: '#1a98cd' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100" style={{ backgroundColor: '#f8fafc' }}>
              <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
            </div>

            {RelativeContextLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Loading payments...</p>
              </div>
            ) : payments.length === 0 ? (
              <div className="p-12 text-center">
                <Receipt className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">No payments found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: '#f8fafc' }} className="border-b border-gray-100">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">Nurse & Patient</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Assignment Details</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {payments.map((payment) => (
                      <tr key={payment.assignmentId} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-gray-900">{payment.patientName}</p>
                            <p className="text-sm text-gray-600">Nurse: {payment.nurseName}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(payment.assignmentDate)}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Due: {formatDate(payment.dueDate)}
                            {isOverdue(payment.dueDate, payment.paymentStatus) && (
                              <span className="text-red-600 font-medium ml-1">(Overdue)</span>
                            )}
                          </p>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-bold text-gray-900">₹{payment.totalAmount.toLocaleString()}</p>
                            <p className="text-sm" style={{ color: '#3aba90' }}>Paid: ₹{payment.paidAmount.toLocaleString()}</p>
                            {payment.pendingAmount > 0 && (
                              <p className="text-sm text-red-600">Due: ₹{payment.pendingAmount.toLocaleString()}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(payment.paymentStatus)}`}>
                            {payment.paymentStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          {payment.paymentStatus !== 'Paid' ? (
                            <button
                              onClick={() => setSelectedPayment(payment)}
                              className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                              style={{
                                background: `linear-gradient(135deg, #1a98cd 0%, #3aba90 100%)`,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              <CreditCard className="w-4 h-4" />
                              Pay Now
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-2 font-medium text-sm" style={{ color: '#3aba90' }}>
                              <Check className="w-4 h-4" />
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Payment Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Make Payment</h2>
                <button
                  onClick={() => {
                    setSelectedPayment(null);
                    setPartialAmount('');
                    setPaymentMode('partial');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Payment Details */}
                <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#f8fafc' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dbeafe' }}>
                      <User className="w-5 h-5" style={{ color: '#1a98cd' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedPayment.nurseName}</p>
                      <p className="text-sm text-gray-600">Patient: {selectedPayment.patientName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Amount</p>
                      <p className="font-bold text-gray-900">₹{selectedPayment.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Pending Amount</p>
                      <p className="font-bold text-red-600">₹{selectedPayment.pendingAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Mode Selection */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Payment Mode</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMode('partial')}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${paymentMode === 'partial'
                          ? 'text-white'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      style={paymentMode === 'partial' ? {
                        background: `linear-gradient(135deg, #1a98cd 0%, #3aba90 100%)`,
                        borderColor: '#1a98cd'
                      } : {}}
                    >
                      Partial Payment
                    </button>
                    <button
                      onClick={() => setPaymentMode('full')}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${paymentMode === 'full'
                          ? 'text-white'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      style={paymentMode === 'full' ? {
                        background: `linear-gradient(135deg, #1a98cd 0%, #3aba90 100%)`,
                        borderColor: '#1a98cd'
                      } : {}}
                    >
                      Full Payment
                    </button>
                  </div>
                </div>

                {/* Amount Input */}
                {paymentMode === 'partial' ? (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enter Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                      <input
                        type="number"
                        min="1"
                        max={selectedPayment.pendingAmount}
                        value={partialAmount}
                        onChange={(e) => setPartialAmount(e.target.value)}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 border focus:ring-[#1a98cd] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-lg font-medium"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1a98cd';
                          e.target.style.boxShadow = `0 0 0 3px rgba(26, 152, 205, 0.1)`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum: ₹{selectedPayment.pendingAmount.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="border rounded-lg p-4" style={{
                      backgroundColor: '#f0f9ff',
                      borderColor: '#1a98cd'
                    }}>
                      <p className="text-sm mb-1" style={{ color: '#1a98cd' }}>Full Payment Amount</p>
                      <p className="text-2xl font-bold" style={{ color: '#1a98cd' }}>₹{selectedPayment.pendingAmount.toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {/* Razorpay Loading Status */}
                {!razorpayLoaded && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading payment gateway...
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedPayment(null);
                      setPartialAmount('');
                      setPaymentMode('partial');
                    }}
                    className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isPaying || !razorpayLoaded || (paymentMode === 'partial' && (!partialAmount || parseFloat(partialAmount) <= 0))}
                    className="flex-1 px-4 py-3 text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, #1a98cd 0%, #3aba90 100%)`
                    }}
                  >
                    {isPaying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Pay {paymentMode === 'full' ? `₹${selectedPayment.pendingAmount.toLocaleString()}` : `₹${partialAmount || '0'}`}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelativePayments;