import React, { useState } from 'react';
import { 
  Building2, Plus, Search, Filter, Phone, Mail, 
  MapPin, CheckCircle2, Clock, AlertCircle, FileText, 
  DollarSign, Truck, Flower2, Package, Printer, Download,
  Eye, Edit3, Trash2, X, Check, ShieldCheck
} from 'lucide-react';

interface VendorPartner {
  id: string;
  name: string;
  category: 'Florist' | 'Casket & Vault' | 'Vehicle Livery' | 'Stonemason' | 'Catering';
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active Partner' | 'Under Review' | 'Suspended';
  rating: string;
  activeOrders: number;
  totalSettled: string;
}

interface PurchaseOrder {
  id: string;
  vendorId: string;
  vendorName: string;
  familyReference: string;
  itemsDescription: string;
  orderDate: string;
  deliveryDate: string;
  status: 'Delivered' | 'In Production' | 'Pending Dispatch' | 'Cancelled';
  amount: number;
  deliveryLocation: string;
}

interface VendorInvoice {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  poReference: string;
  issuedDate: string;
  dueDate: string;
  amount: number;
  status: 'Settled' | 'Pending Audit' | 'Approved for Payment';
}

interface Props {
  onShowToast: (msg: string) => void;
  initialSubmodule?: 'directory' | 'orders' | 'invoices';
}

export default function CmsVendor({ onShowToast, initialSubmodule = 'directory' }: Props) {
  // Submodules
  const [activeSubmodule, setActiveSubmodule] = useState<'directory' | 'orders' | 'invoices'>(initialSubmodule);
  const [search, setSearch] = useState('');

  // Datasets
  const [vendors, setVendors] = useState<VendorPartner[]>([
    {
      id: 'v-1',
      name: 'Twin Cities Floral Botanica',
      category: 'Florist',
      contactPerson: 'Clara Vance',
      email: 'orders@twincitiesbotanica.com',
      phone: '(651) 555-0812',
      address: '740 Grand Ave, St. Paul, MN 55105',
      status: 'Active Partner',
      rating: '4.9/5',
      activeOrders: 4,
      totalSettled: '$48,250'
    },
    {
      id: 'v-2',
      name: 'Northstar Casket & Vault Artisans',
      category: 'Casket & Vault',
      contactPerson: 'David Kjellberg',
      email: 'dispatch@northstarcaskets.com',
      phone: '(612) 555-0344',
      address: '1420 Industrial Blvd, Minneapolis, MN 55413',
      status: 'Active Partner',
      rating: '5.0/5',
      activeOrders: 2,
      totalSettled: '$184,900'
    },
    {
      id: 'v-3',
      name: 'Elegance Memorial Livery & Coaches',
      category: 'Vehicle Livery',
      contactPerson: 'Marcus Thorne',
      email: 'booking@elegancelivery.com',
      phone: '(651) 555-0921',
      address: '320 University Ave, St. Paul, MN 55103',
      status: 'Active Partner',
      rating: '4.8/5',
      activeOrders: 3,
      totalSettled: '$62,400'
    },
    {
      id: 'v-4',
      name: 'Highland Monument & Stoneworks',
      category: 'Stonemason',
      contactPerson: 'Eleanor Gray',
      email: 'carving@highlandmonuments.com',
      phone: '(651) 555-0556',
      address: '910 Snelling Ave, St. Paul, MN 55116',
      status: 'Active Partner',
      rating: '4.9/5',
      activeOrders: 1,
      totalSettled: '$39,100'
    }
  ]);

  const [orders, setOrders] = useState<PurchaseOrder[]>([
    {
      id: 'PO-8841',
      vendorId: 'v-1',
      vendorName: 'Twin Cities Floral Botanica',
      familyReference: 'Thornton Family Memorial',
      itemsDescription: 'White Lily Casket Spray (6ft) + 2 Standing Wreaths',
      orderDate: 'March 2, 2026',
      deliveryDate: 'March 5, 2026 at 09:00 AM',
      status: 'Delivered',
      amount: 680,
      deliveryLocation: 'St. Paul Historic Chapel'
    },
    {
      id: 'PO-8842',
      vendorId: 'v-2',
      vendorName: 'Northstar Casket & Vault Artisans',
      familyReference: 'Holloway Family Service',
      itemsDescription: 'Solid Cherry Wood Casket with Velvet Interior + Vault',
      orderDate: 'March 3, 2026',
      deliveryDate: 'March 6, 2026 at 08:30 AM',
      status: 'In Production',
      amount: 4250,
      deliveryLocation: 'Apple Valley Preparation Sanctuary'
    },
    {
      id: 'PO-8843',
      vendorId: 'v-3',
      vendorName: 'Elegance Memorial Livery & Coaches',
      familyReference: 'Thornton Family Memorial',
      itemsDescription: 'Black Cadillac Hearse + 2 Limousines for Family Cortège',
      orderDate: 'March 3, 2026',
      deliveryDate: 'March 5, 2026 at 10:00 AM',
      status: 'Delivered',
      amount: 1450,
      deliveryLocation: 'St. Paul Cathedral to Resurrection Cemetery'
    }
  ]);

  const [invoices, setInvoices] = useState<VendorInvoice[]>([
    {
      id: 'inv-101',
      invoiceNumber: 'INV-2026-084',
      vendorName: 'Twin Cities Floral Botanica',
      poReference: 'PO-8841',
      issuedDate: 'March 4, 2026',
      dueDate: 'April 4, 2026',
      amount: 680,
      status: 'Approved for Payment'
    },
    {
      id: 'inv-102',
      invoiceNumber: 'INV-2026-089',
      vendorName: 'Northstar Casket & Vault Artisans',
      poReference: 'PO-8842',
      issuedDate: 'March 3, 2026',
      dueDate: 'April 3, 2026',
      amount: 4250,
      status: 'Pending Audit'
    },
    {
      id: 'inv-103',
      invoiceNumber: 'INV-2026-072',
      vendorName: 'Elegance Memorial Livery & Coaches',
      poReference: 'PO-8843',
      issuedDate: 'March 2, 2026',
      dueDate: 'April 2, 2026',
      amount: 1450,
      status: 'Settled'
    }
  ]);

  // Modals
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showNewPoModal, setShowNewPoModal] = useState(false);

  // Add Vendor Form
  const [newVendorForm, setNewVendorForm] = useState({
    name: '',
    category: 'Florist' as VendorPartner['category'],
    contactPerson: '',
    email: '',
    phone: '',
    address: ''
  });

  // New PO Form
  const [newPoForm, setNewPoForm] = useState({
    vendorId: 'v-1',
    familyReference: '',
    itemsDescription: '',
    amount: 500,
    deliveryDate: '',
    deliveryLocation: 'Apple Valley Chapel'
  });

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorForm.name.trim()) return;

    const v: VendorPartner = {
      id: `v-${Date.now()}`,
      name: newVendorForm.name.trim(),
      category: newVendorForm.category,
      contactPerson: newVendorForm.contactPerson || 'Account Lead',
      email: newVendorForm.email || 'orders@partner.com',
      phone: newVendorForm.phone || '(651) 555-0000',
      address: newVendorForm.address || 'Twin Cities Metro, MN',
      status: 'Active Partner',
      rating: '5.0/5',
      activeOrders: 0,
      totalSettled: '$0'
    };

    setVendors([v, ...vendors]);
    setShowAddVendorModal(false);
    onShowToast(`Enrolled vendor partner "${v.name}"`);
  };

  const handleCreatePo = (e: React.FormEvent) => {
    e.preventDefault();
    const vendor = vendors.find(v => v.id === newPoForm.vendorId) || vendors[0];

    const po: PurchaseOrder = {
      id: `PO-${Math.floor(8800 + Math.random() * 1000)}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      familyReference: newPoForm.familyReference.trim() || 'Family Memorial Service',
      itemsDescription: newPoForm.itemsDescription.trim() || 'Memorial supplies',
      orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deliveryDate: newPoForm.deliveryDate || 'Within 48 hours',
      status: 'Pending Dispatch',
      amount: Number(newPoForm.amount) || 450,
      deliveryLocation: newPoForm.deliveryLocation
    };

    setOrders([po, ...orders]);
    setShowNewPoModal(false);
    onShowToast(`Generated Purchase Order ${po.id} for ${vendor.name}`);
  };

  const handleSettleInvoice = (invId: string) => {
    setInvoices(invoices.map(i => i.id === invId ? { ...i, status: 'Settled' } : i));
    onShowToast('Disbursement settled and marked paid');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner (1. Title -> 2. Text -> 3. Buttons) */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-xl space-y-4 border border-[#C5A059]/40 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <Building2 className="w-7 h-7 text-[#C5A059] shrink-0" />
            <h2 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-tight text-white">
              Vendor Partners & Procurement
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNewPoModal(true)}
              className="px-5 py-2.5 bg-[#C5A059] hover:bg-white text-[#411548] font-black text-xs uppercase tracking-wider rounded-full shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> + Purchase Order
            </button>
            <button
              onClick={() => setShowAddVendorModal(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white text-white hover:text-[#411548] font-black text-xs uppercase tracking-wider rounded-full flex items-center gap-2 transition-all cursor-pointer border border-white/20"
            >
              <Building2 className="w-4 h-4 text-[#C5A059]" /> + Enroll Vendor
            </button>
          </div>
        </div>

        <p className="text-xs md:text-sm text-white/80 font-light max-w-4xl leading-relaxed relative z-10">
          Manage certified partner florists, bespoke casket artisans, memorial livery coaches, and stone monument suppliers supporting Middleton services.
        </p>

        {/* Submodule Tabs strictly requested: Directory, Purchase Orders, Invoices */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/10 overflow-x-auto relative z-10">
          {[
            { id: 'directory', label: 'Vendor Directory', icon: Building2, count: vendors.length },
            { id: 'orders', label: 'Purchase Orders', icon: Package, count: orders.length },
            { id: 'invoices', label: 'Invoices & Settlements', icon: DollarSign, count: invoices.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubmodule(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeSubmodule === tab.id
                  ? 'bg-[#C5A059] text-[#411548] shadow-md font-extrabold'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${activeSubmodule === tab.id ? 'text-[#411548]' : 'text-[#C5A059]'}`} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeSubmodule === tab.id ? 'bg-[#411548] text-white' : 'bg-white/20 text-white'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SUBTAB 1: VENDOR DIRECTORY */}
      {activeSubmodule === 'directory' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vendors.map(v => (
              <div key={v.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 bg-[#411548]/10 text-[#411548] text-[9px] font-black uppercase rounded-full">
                        {v.category}
                      </span>
                      <h3 className="font-serif font-black text-lg text-gray-900 mt-1">{v.name}</h3>
                      <p className="text-xs text-gray-500 font-medium">Lead: {v.contactPerson}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                      ★ {v.rating}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{v.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="font-mono text-[11px]">{v.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="truncate">{v.address}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#411548]">{v.activeOrders} Active POs</span>
                  <span className="text-gray-500 font-medium">Settled: <strong>{v.totalSettled}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: PURCHASE ORDERS */}
      {activeSubmodule === 'orders' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Active Purchase Orders & Requisitions</h3>
              <p className="text-xs text-gray-500 font-light mt-0.5">Track supplies dispatched for family memorials</p>
            </div>
            <button
              onClick={() => onShowToast('Exported Purchase Orders')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print All POs
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf4fa] text-gray-500 font-black uppercase text-[10px] border-b border-gray-200">
                <tr>
                  <th className="p-4">PO #</th>
                  <th className="p-4">Vendor Partner</th>
                  <th className="p-4">Family Reference</th>
                  <th className="p-4">Items / Supplies</th>
                  <th className="p-4">Delivery Date & Location</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {orders.map(po => (
                  <tr key={po.id} className="hover:bg-gray-50/80">
                    <td className="p-4 font-mono font-bold text-[#411548]">{po.id}</td>
                    <td className="p-4 font-bold">{po.vendorName}</td>
                    <td className="p-4 text-gray-600">{po.familyReference}</td>
                    <td className="p-4 text-gray-700 max-w-xs">{po.itemsDescription}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{po.deliveryDate}</div>
                      <div className="text-[10px] text-gray-500">{po.deliveryLocation}</div>
                    </td>
                    <td className="p-4 text-right font-serif font-black text-gray-900">${po.amount.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        po.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: INVOICES & SETTLEMENTS */}
      {activeSubmodule === 'invoices' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Invoices & Partner Disbursements</h3>
              <p className="text-xs text-gray-500 font-light mt-0.5">Billing audits and settlement disbursements</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf4fa] text-gray-500 font-black uppercase text-[10px] border-b border-gray-200">
                <tr>
                  <th className="p-4">Invoice #</th>
                  <th className="p-4">Vendor</th>
                  <th className="p-4">PO Ref</th>
                  <th className="p-4">Issued</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-gray-50/80">
                    <td className="p-4 font-mono font-bold text-[#411548]">{inv.invoiceNumber}</td>
                    <td className="p-4 font-bold">{inv.vendorName}</td>
                    <td className="p-4 font-mono text-gray-500">{inv.poReference}</td>
                    <td className="p-4 text-gray-600">{inv.issuedDate}</td>
                    <td className="p-4 text-gray-600">{inv.dueDate}</td>
                    <td className="p-4 text-right font-serif font-black text-gray-900">${inv.amount.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        inv.status === 'Settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {inv.status !== 'Settled' ? (
                        <button
                          onClick={() => handleSettleInvoice(inv.id)}
                          className="px-3 py-1 bg-[#411548] hover:bg-black text-[#C5A059] rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer"
                        >
                          Disburse & Settle
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Paid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD VENDOR MODAL */}
      {showAddVendorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Enroll Vendor Partner</h3>
              <button onClick={() => setShowAddVendorModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVendor} className="space-y-3 text-xs">
              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Company / Partner Name *</label>
                <input
                  type="text"
                  required
                  value={newVendorForm.name}
                  onChange={e => setNewVendorForm({ ...newVendorForm, name: e.target.value })}
                  placeholder="e.g. Twin Cities Floral Botanica"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Category</label>
                <select
                  value={newVendorForm.category}
                  onChange={e => setNewVendorForm({ ...newVendorForm, category: e.target.value as any })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[#411548]"
                >
                  <option value="Florist">Florist</option>
                  <option value="Casket & Vault">Casket & Vault</option>
                  <option value="Vehicle Livery">Vehicle Livery & Hearse</option>
                  <option value="Stonemason">Stonemason & Monuments</option>
                  <option value="Catering">Catering & Repast</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={newVendorForm.contactPerson}
                    onChange={e => setNewVendorForm({ ...newVendorForm, contactPerson: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={newVendorForm.phone}
                    onChange={e => setNewVendorForm({ ...newVendorForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddVendorModal(false)} className="px-4 py-2 bg-gray-100 rounded-full font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#411548] text-white rounded-full font-black uppercase">Enroll Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW PO MODAL */}
      {showNewPoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase">Generate Purchase Order</h3>
              <button onClick={() => setShowNewPoModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePo} className="space-y-3 text-xs">
              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Vendor Partner *</label>
                <select
                  value={newPoForm.vendorId}
                  onChange={e => setNewPoForm({ ...newPoForm, vendorId: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-[#411548]"
                >
                  {vendors.map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Family Reference *</label>
                <input
                  type="text"
                  required
                  value={newPoForm.familyReference}
                  onChange={e => setNewPoForm({ ...newPoForm, familyReference: e.target.value })}
                  placeholder="e.g. Thornton Family Service"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="font-black uppercase text-gray-700 block mb-1">Items Description</label>
                <textarea
                  rows={2}
                  value={newPoForm.itemsDescription}
                  onChange={e => setNewPoForm({ ...newPoForm, itemsDescription: e.target.value })}
                  placeholder="e.g. Casket floral tribute with white orchids and lilies"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Amount ($)</label>
                  <input
                    type="number"
                    value={newPoForm.amount}
                    onChange={e => setNewPoForm({ ...newPoForm, amount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-black uppercase text-gray-700 block mb-1">Delivery Time</label>
                  <input
                    type="text"
                    value={newPoForm.deliveryDate}
                    onChange={e => setNewPoForm({ ...newPoForm, deliveryDate: e.target.value })}
                    placeholder="e.g. Friday at 9:00 AM"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setShowNewPoModal(false)} className="px-4 py-2 bg-gray-100 rounded-full font-bold">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#411548] text-white rounded-full font-black uppercase">Issue PO</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
