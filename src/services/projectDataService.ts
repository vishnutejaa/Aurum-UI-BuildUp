// Project Data Service - Manages project-related data relationships
// This service provides functions to get all data related to a specific project

// Import existing data structures
import { rfqData } from '../components/RFQListView';
import { quotesData } from '../components/QuotesListView';
import { poData } from '../components/POListView';
import { goodsData } from '../components/GoodsListView';

export interface ProjectRFQ {
  id: number;
  rfqNumber: string;
  title: string;
  customer: string;
  project: string;
  dueDate: string;
  status: string;
  priority: string;
  estimatedValue: string;
  suppliersInvited: number;
  responsesReceived: number;
  description: string;
}

export interface ProjectQuote {
  id: number;
  quoteNumber: string;
  rfqReference: string;
  supplier: string;
  project: string;
  submittedDate: string;
  validUntil: string;
  status: string;
  totalAmount: string;
  currency: string;
  deliveryTime: string;
  description: string;
}

export interface ProjectPO {
  id: number;
  poNumber: string;
  quoteReference: string;
  supplier: string;
  project: string;
  orderDate: string;
  expectedDelivery: string;
  status: string;
  totalAmount: string;
  currency: string;
  paymentTerms: string;
  description: string;
}

export interface ProjectGoods {
  id: number;
  shipmentNumber: string;
  poReference: string;
  supplier: string;
  project: string;
  shippedDate: string;
  expectedArrival: string;
  actualArrival: string | null;
  status: string;
  trackingNumber: string;
  carrier: string;
  description: string;
}

// Enhanced demo data for better demonstration
const enhancedRFQData = [
  {
    id: 1,
    rfqNumber: 'RFQ-2024-001',
    title: 'CNC Machine Components',
    customer: 'Acme Manufacturing Corp',
    project: 'PRJ-2024-001',
    dueDate: '2024-02-15',
    status: 'Active',
    priority: 'High',
    estimatedValue: '$450,000',
    suppliersInvited: 5,
    responsesReceived: 3,
    description: 'Precision machined components for CNC equipment upgrade including spindle assemblies, tool holders, and control systems'
  },
  {
    id: 2,
    rfqNumber: 'RFQ-2024-002',
    title: 'Network Infrastructure Equipment',
    customer: 'Global Industries Ltd',
    project: 'PRJ-2024-002',
    dueDate: '2024-02-20',
    status: 'Draft',
    priority: 'Medium',
    estimatedValue: '$125,000',
    suppliersInvited: 3,
    responsesReceived: 0,
    description: 'Switches, routers, and cabling for office infrastructure upgrade with redundancy and security features'
  },
  {
    id: 3,
    rfqNumber: 'RFQ-2024-003',
    title: 'Automation Control Systems',
    customer: 'Tech Solutions Inc',
    project: 'PRJ-2024-003',
    dueDate: '2024-02-10',
    status: 'Closed',
    priority: 'High',
    estimatedValue: '$750,000',
    suppliersInvited: 6,
    responsesReceived: 6,
    description: 'PLC systems and control panels for warehouse automation with IoT integration and remote monitoring'
  },
  {
    id: 4,
    rfqNumber: 'RFQ-2024-004',
    title: 'Security Camera Systems',
    customer: 'European Manufacturing',
    project: 'PRJ-2024-004',
    dueDate: '2024-01-30',
    status: 'Expired',
    priority: 'Low',
    estimatedValue: '$85,000',
    suppliersInvited: 4,
    responsesReceived: 2,
    description: 'IP cameras and surveillance equipment installation for perimeter security and internal monitoring'
  },
  {
    id: 5,
    rfqNumber: 'RFQ-2024-005',
    title: 'Solar Panel Systems',
    customer: 'Nordic Components',
    project: 'PRJ-2024-005',
    dueDate: '2024-03-15',
    status: 'Active',
    priority: 'High',
    estimatedValue: '$2,800,000',
    suppliersInvited: 8,
    responsesReceived: 4,
    description: 'Complete solar panel installation with battery storage systems and grid integration equipment'
  },
  {
    id: 6,
    rfqNumber: 'RFQ-2024-006',
    title: 'Hydraulic Systems',
    customer: 'Acme Manufacturing Corp',
    // old: project: 'PRJ-2024-001',
    // new: ensure one RFQ per project – reassign to PRJ-2024-006
    project: 'PRJ-2024-006',
    dueDate: '2024-02-25',
    status: 'Active',
    priority: 'Medium',
    estimatedValue: '$180,000',
    suppliersInvited: 4,
    responsesReceived: 2,
    description: 'Hydraulic pumps, valves, and control systems for manufacturing equipment'
  },
  {
    id: 7,
    rfqNumber: 'RFQ-2024-007',
    title: 'Electrical Components',
    customer: 'Acme Manufacturing Corp',
    // old: project: 'PRJ-2024-001',
    // new: ensure one RFQ per project – reassign to PRJ-2024-007
    project: 'PRJ-2024-007',
    dueDate: '2024-03-01',
    status: 'Draft',
    priority: 'Medium',
    estimatedValue: '$95,000',
    suppliersInvited: 3,
    responsesReceived: 0,
    description: 'Control panels, sensors, and electrical distribution equipment'
  },
  {
    id: 8,
    rfqNumber: 'RFQ-2024-008',
    title: 'Server Infrastructure',
    customer: 'Global Industries Ltd',
    // old: project: 'PRJ-2024-002',
    // new: ensure one RFQ per project – reassign to PRJ-2024-008
    project: 'PRJ-2024-008',
    dueDate: '2024-02-28',
    status: 'Active',
    priority: 'High',
    estimatedValue: '$320,000',
    suppliersInvited: 5,
    responsesReceived: 3,
    description: 'High-performance servers, storage systems, and backup solutions'
  }
];

const enhancedQuotesData = [
  {
    id: 1,
    quoteNumber: 'QUO-2024-001',
    rfqReference: 'RFQ-2024-001',
    supplier: 'MachCorp Industries',
    project: 'PRJ-2024-001',
    submittedDate: '2024-02-08',
    validUntil: '2024-03-08',
    status: 'Under Review',
    totalAmount: '$445,000',
    currency: 'USD',
    deliveryTime: '8-12 weeks',
    description: 'CNC machine components with installation and 2-year warranty'
  },
  {
    id: 2,
    quoteNumber: 'QUO-2024-002',
    rfqReference: 'RFQ-2024-001',
    supplier: 'TechSolutions Ltd',
    project: 'PRJ-2024-001',
    submittedDate: '2024-02-10',
    validUntil: '2024-03-10',
    status: 'Accepted',
    totalAmount: '$420,000',
    currency: 'USD',
    deliveryTime: '6-10 weeks',
    description: 'Premium CNC components with extended warranty and technical support'
  },
  {
    id: 3,
    quoteNumber: 'QUO-2024-003',
    rfqReference: 'RFQ-2024-002',
    supplier: 'NetworkPro Systems',
    project: 'PRJ-2024-002',
    submittedDate: '2024-02-12',
    validUntil: '2024-03-12',
    status: 'Pending',
    totalAmount: '$118,500',
    currency: 'USD',
    deliveryTime: '4-6 weeks',
    description: 'Complete network infrastructure package with installation services'
  },
  {
    id: 4,
    quoteNumber: 'QUO-2024-004',
    rfqReference: 'RFQ-2024-003',
    supplier: 'AutoSys Controls',
    project: 'PRJ-2024-003',
    submittedDate: '2024-02-05',
    validUntil: '2024-03-05',
    status: 'Rejected',
    totalAmount: '$785,000',
    currency: 'USD',
    deliveryTime: '12-16 weeks',
    description: 'Advanced automation control systems with custom programming'
  },
  {
    id: 5,
    quoteNumber: 'QUO-2024-005',
    rfqReference: 'RFQ-2024-003',
    supplier: 'Industrial Controls Inc',
    project: 'PRJ-2024-003',
    submittedDate: '2024-02-07',
    validUntil: '2024-03-07',
    status: 'Accepted',
    totalAmount: '$720,000',
    currency: 'USD',
    deliveryTime: '10-14 weeks',
    description: 'PLC systems with IoT integration and remote monitoring capabilities'
  },
  {
    id: 6,
    quoteNumber: 'QUO-2024-006',
    rfqReference: 'RFQ-2024-004',
    supplier: 'Security Systems Pro',
    project: 'PRJ-2024-004',
    submittedDate: '2024-01-25',
    validUntil: '2024-02-25',
    status: 'Under Review',
    totalAmount: '$82,000',
    currency: 'USD',
    deliveryTime: '3-5 weeks',
    description: 'IP camera systems with NVR and mobile app integration'
  },
  {
    id: 7,
    quoteNumber: 'QUO-2024-007',
    rfqReference: 'RFQ-2024-005',
    supplier: 'Green Energy Corp',
    project: 'PRJ-2024-005',
    submittedDate: '2024-02-20',
    validUntil: '2024-04-20',
    status: 'Under Review',
    totalAmount: '$2,650,000',
    currency: 'USD',
    deliveryTime: '16-20 weeks',
    description: 'Solar panel systems with battery storage and smart grid integration'
  },
  {
    id: 8,
    quoteNumber: 'QUO-2024-008',
    rfqReference: 'RFQ-2024-006',
    supplier: 'Hydraulic Solutions',
    project: 'PRJ-2024-001',
    submittedDate: '2024-02-18',
    validUntil: '2024-03-18',
    status: 'Accepted',
    totalAmount: '$175,000',
    currency: 'USD',
    deliveryTime: '6-8 weeks',
    description: 'Complete hydraulic system with pressure testing and certification'
  },
  {
    id: 9,
    quoteNumber: 'QUO-2024-009',
    rfqReference: 'RFQ-2024-008',
    supplier: 'ServerTech Solutions',
    project: 'PRJ-2024-002',
    submittedDate: '2024-02-22',
    validUntil: '2024-03-22',
    status: 'Under Review',
    totalAmount: '$305,000',
    currency: 'USD',
    deliveryTime: '4-6 weeks',
    description: 'Enterprise-grade servers with redundant power and cooling systems'
  }
];

const enhancedPOData = [
  {
    id: 1,
    poNumber: 'PO-2024-001',
    quoteReference: 'QUO-2024-002',
    supplier: 'TechSolutions Ltd',
    project: 'PRJ-2024-001',
    orderDate: '2024-02-15',
    expectedDelivery: '2024-04-20',
    status: 'Approved',
    totalAmount: '$420,000',
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'CNC machine components purchase order with installation services'
  },
  {
    id: 2,
    poNumber: 'PO-2024-002',
    quoteReference: 'QUO-2024-003',
    supplier: 'NetworkPro Systems',
    project: 'PRJ-2024-002',
    orderDate: '2024-02-18',
    expectedDelivery: '2024-03-25',
    status: 'Pending Approval',
    totalAmount: '$118,500',
    currency: 'USD',
    paymentTerms: 'Net 15',
    description: 'Network infrastructure equipment with installation support'
  },
  {
    id: 3,
    poNumber: 'PO-2024-003',
    quoteReference: 'QUO-2024-005',
    supplier: 'Industrial Controls Inc',
    project: 'PRJ-2024-003',
    orderDate: '2024-02-12',
    expectedDelivery: '2024-04-15',
    status: 'Approved',
    totalAmount: '$720,000',
    currency: 'USD',
    paymentTerms: 'Net 45',
    description: 'Automation control systems with programming and commissioning'
  },
  {
    id: 4,
    poNumber: 'PO-2024-004',
    quoteReference: 'QUO-2024-007',
    supplier: 'Green Energy Corp',
    project: 'PRJ-2024-005',
    orderDate: '2024-02-25',
    expectedDelivery: '2024-06-15',
    status: 'Pending Approval',
    totalAmount: '$2,650,000',
    currency: 'USD',
    paymentTerms: 'Net 60',
    description: 'Solar panel systems with battery storage installation'
  },
  {
    id: 5,
    poNumber: 'PO-2024-005',
    quoteReference: 'QUO-2024-008',
    supplier: 'Hydraulic Solutions',
    project: 'PRJ-2024-001',
    orderDate: '2024-02-20',
    expectedDelivery: '2024-04-15',
    status: 'Approved',
    totalAmount: '$175,000',
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'Hydraulic systems with testing and certification'
  },
  {
    id: 6,
    poNumber: 'PO-2024-006',
    quoteReference: 'QUO-2024-009',
    supplier: 'ServerTech Solutions',
    project: 'PRJ-2024-002',
    orderDate: '2024-02-28',
    expectedDelivery: '2024-04-15',
    status: 'Draft',
    totalAmount: '$305,000',
    currency: 'USD',
    paymentTerms: 'Net 30',
    description: 'Server infrastructure with redundant systems'
  }
];

const enhancedGoodsData = [
  {
    id: 1,
    shipmentNumber: 'SH-2024-001',
    poReference: 'PO-2024-001',
    supplier: 'TechSolutions Ltd',
    project: 'PRJ-2024-001',
    shippedDate: '2024-04-15',
    expectedArrival: '2024-04-22',
    actualArrival: '2024-04-20',
    status: 'Received',
    trackingNumber: 'TRK-789456123',
    carrier: 'DHL Express',
    description: 'CNC machine components - 15 units with installation manuals'
  },
  {
    id: 2,
    shipmentNumber: 'SH-2024-002',
    poReference: 'PO-2024-002',
    supplier: 'NetworkPro Systems',
    project: 'PRJ-2024-002',
    shippedDate: '2024-03-20',
    expectedArrival: '2024-03-27',
    actualArrival: null,
    status: 'In Transit',
    trackingNumber: 'TRK-456123789',
    carrier: 'FedEx International',
    description: 'Network switches and routers - 25 units with configuration files'
  },
  {
    id: 3,
    shipmentNumber: 'SH-2024-003',
    poReference: 'PO-2024-003',
    supplier: 'Industrial Controls Inc',
    project: 'PRJ-2024-003',
    shippedDate: '2024-02-25',
    expectedArrival: '2024-03-01',
    actualArrival: '2024-02-28',
    status: 'Quality Check',
    trackingNumber: 'TRK-123789456',
    carrier: 'UPS Ground',
    description: 'PLC control systems and HMI panels - 8 units'
  },
  {
    id: 4,
    shipmentNumber: 'SH-2024-004',
    poReference: 'PO-2024-004',
    supplier: 'Green Energy Corp',
    project: 'PRJ-2024-005',
    shippedDate: '2024-05-10',
    expectedArrival: '2024-05-20',
    actualArrival: null,
    status: 'Shipped',
    trackingNumber: 'TRK-987654321',
    carrier: 'Custom Freight',
    description: 'Solar panels and battery units - 50 units with mounting hardware'
  },
  {
    id: 5,
    shipmentNumber: 'SH-2024-005',
    poReference: 'PO-2024-005',
    supplier: 'Hydraulic Solutions',
    project: 'PRJ-2024-001',
    shippedDate: '2024-04-10',
    expectedArrival: '2024-04-15',
    actualArrival: null,
    status: 'In Transit',
    trackingNumber: 'TRK-555666777',
    carrier: 'TNT Express',
    description: 'Hydraulic pumps and control valves - 12 units with test certificates'
  }
];

// Function to get all RFQs for a specific project
export const getProjectRFQs = (projectId: string | number): ProjectRFQ[] => {
  // Convert project ID to project code format if needed
  const projectCode = typeof projectId === 'number' ? `PRJ-2024-${String(projectId).padStart(3, '0')}` : projectId;
  
  // Use enhanced demo data for better demonstration
  return enhancedRFQData.filter(rfq => rfq.project === projectCode);
};

// Function to get all quotes for a specific project
export const getProjectQuotes = (projectId: string | number): ProjectQuote[] => {
  const projectCode = typeof projectId === 'number' ? `PRJ-2024-${String(projectId).padStart(3, '0')}` : projectId;
  
  // Use enhanced demo data for better demonstration
  return enhancedQuotesData.filter(quote => quote.project === projectCode);
};

// Function to get all purchase orders for a specific project
export const getProjectPOs = (projectId: string | number): ProjectPO[] => {
  const projectCode = typeof projectId === 'number' ? `PRJ-2024-${String(projectId).padStart(3, '0')}` : projectId;
  
  // Use enhanced demo data for better demonstration
  return enhancedPOData.filter(po => po.project === projectCode);
};

// Function to get all goods/shipments for a specific project
export const getProjectGoods = (projectId: string | number): ProjectGoods[] => {
  const projectCode = typeof projectId === 'number' ? `PRJ-2024-${String(projectId).padStart(3, '0')}` : projectId;
  
  // Use enhanced demo data for better demonstration
  return enhancedGoodsData.filter(goods => goods.project === projectCode);
};

// Function to get project summary statistics
export const getProjectSummary = (projectId: string | number) => {
  const rfqs = getProjectRFQs(projectId);
  const quotes = getProjectQuotes(projectId);
  const pos = getProjectPOs(projectId);
  const goods = getProjectGoods(projectId);

  return {
    rfqs: {
      total: rfqs.length,
      active: rfqs.filter(r => r.status === 'Active').length,
      closed: rfqs.filter(r => r.status === 'Closed').length,
      draft: rfqs.filter(r => r.status === 'Draft').length
    },
    quotes: {
      total: quotes.length,
      pending: quotes.filter(q => q.status === 'Pending').length,
      received: quotes.filter(q => q.status === 'Under Review').length,
      evaluated: quotes.filter(q => q.status === 'Accepted' || q.status === 'Rejected').length
    },
    pos: {
      total: pos.length,
      approved: pos.filter(p => p.status === 'Approved').length,
      pending: pos.filter(p => p.status === 'Pending Approval').length,
      delivered: pos.filter(p => p.status === 'Delivered').length
    },
    goods: {
      total: goods.length,
      shipped: goods.filter(g => g.status === 'Shipped').length,
      inTransit: goods.filter(g => g.status === 'In Transit').length,
      received: goods.filter(g => g.status === 'Received').length
    }
  };
};

// Helper function to get project financial summary
export const getProjectFinancialSummary = (projectId: string | number) => {
  const quotes = getProjectQuotes(projectId);
  const pos = getProjectPOs(projectId);
  
  const totalQuotedValue = quotes
    .filter(q => q.status === 'Accepted')
    .reduce((sum, q) => sum + parseFloat(q.totalAmount.replace(/[$,]/g, '')), 0);
    
  const totalPOValue = pos
    .filter(p => p.status === 'Approved')
    .reduce((sum, p) => sum + parseFloat(p.totalAmount.replace(/[$,]/g, '')), 0);
    
  const pendingQuotes = quotes
    .filter(q => q.status === 'Under Review' || q.status === 'Pending')
    .reduce((sum, q) => sum + parseFloat(q.totalAmount.replace(/[$,]/g, '')), 0);
    
  return {
    totalQuotedValue: `$${totalQuotedValue.toLocaleString()}`,
    totalPOValue: `$${totalPOValue.toLocaleString()}`,
    pendingQuotes: `$${pendingQuotes.toLocaleString()}`,
    savings: `$${(totalQuotedValue - totalPOValue).toLocaleString()}`,
    quoteCount: quotes.length,
    poCount: pos.length
  };
};

// Helper function to get project timeline summary
export const getProjectTimelineSummary = (projectId: string | number) => {
  const rfqs = getProjectRFQs(projectId);
  const pos = getProjectPOs(projectId);
  const goods = getProjectGoods(projectId);
  
  const activeRFQs = rfqs.filter(r => r.status === 'Active');
  const pendingPOs = pos.filter(p => p.status === 'Pending Approval');
  const inTransitGoods = goods.filter(g => g.status === 'In Transit');
  
  return {
    activeRFQs: activeRFQs.length,
    pendingPOs: pendingPOs.length,
    inTransitGoods: inTransitGoods.length,
    nextDeadline: activeRFQs.length > 0 
      ? activeRFQs.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0]?.dueDate 
      : null,
    estimatedCompletion: pos.length > 0 
      ? pos.sort((a, b) => new Date(a.expectedDelivery).getTime() - new Date(b.expectedDelivery).getTime())[pos.length - 1]?.expectedDelivery 
      : null
  };
};
