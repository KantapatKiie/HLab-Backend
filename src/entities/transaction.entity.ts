import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

@Entity({ name: 'transactions', schema: 'TRANS', synchronize: false })
export class Transaction {
  @PrimaryColumn({ name: 'transaction_number', nullable: false })
  transactionNumber: string;

  @Column({ name: 'transaction_id', nullable: true })
  transactionId: string;

  @PrimaryColumn({ name: 'transaction_item_number', nullable: false })
  transactionItemNumber: string;

  @Column({ name: 'transaction_item_id', nullable: false })
  transactionItemId: string;

  @Column({ name: 'ship_to_code', nullable: false })
  shipToCode: string;

  @Column({ name: 'ship_to' })
  shipTo: string;

  @Column({ name: 'ship_to_address', nullable: true })
  shipToAddress: string;

  @Column({ name: 'ship_to_name' })
  shipToName: string;

  @Column({ name: 'sold_to_code' })
  soldToCode: string;

  @Column({ name: 'sold_to', nullable: false })
  soldTo: string;

  @Column({ name: 'sold_to_name', nullable: true })
  soldToName: string;

  @Column({ name: 'sold_to_name1', nullable: true })
  soldToName1: string;

  @Column({ name: 'sold_to_name2', nullable: true })
  soldToName2: string;

  @Column({ name: 'sold_to_name3', nullable: true })
  soldToName3: string;

  @Column({ name: 'sold_to_name4', nullable: true })
  soldToName4: string;

  @Column({ name: 'sold_to_address', nullable: true })
  soldToAddress: string;

  @Column({ name: 'sold_to_street1', nullable: true })
  soldToStreet1: string;

  @Column({ name: 'sold_to_street2', nullable: true })
  soldToStreet2: string;

  @Column({ name: 'sold_to_street3', nullable: true })
  soldToStreet3: string;

  @Column({ name: 'sold_to_street4', nullable: true })
  soldToStreet4: string;

  @Column({ name: 'sold_to_street5', nullable: true })
  soldToStreet5: string;

  @Column({ name: 'sold_to_postcode', nullable: true })
  soldToPostCode: string;

  @Column({ name: 'sold_to_district', nullable: true })
  soldToDistrict: string;

  @Column({ name: 'sold_to_city', nullable: true })
  soldToCity: string;

  @Column({ name: 'selling_approach', nullable: true })
  sellingApproach: string;

  @Column({ name: 'selling_approach_name', nullable: true })
  sellingApproachName: string;

  @Column({ name: 'production_site', nullable: true })
  productionSite: string;

  @Column({ name: 'production_site_name', nullable: true })
  productionSiteName: string;

  @Column({ name: 'sales_partner_code', nullable: true })
  salesPartnerCode: string;

  @Column({ name: 'sales_partner', nullable: true })
  salesPartner: string;

  @Column({ name: 'sales_partner_name', nullable: true })
  salesPartnerName: string;

  @Column({ name: 'payment_term' })
  paymentTerm: string;

  @Column({ name: 'payment_term_name' })
  paymentTermName: string;

  @Column({ name: 'po_number', nullable: true })
  poNumber: string;

  @Column({ name: 'po_date', nullable: true })
  poDate: Date;

  @Column()
  channel: string;

  @Column({ name: 'channel_name', nullable: true })
  channelName: string;

  @Column({ name: 'channel_group' })
  channelGroup: string;

  @Column({ name: 'material_code' })
  materialCode: string;

  @Column({ nullable: true })
  commission: number;

  @Column({ name: 'commission_currency', nullable: true })
  commissionCurrency: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ name: 'sq_type' })
  sqType: string;

  @Column({ name: 'container_size', nullable: true })
  containerSize: string;

  @Column({ name: 'selling_price', type: 'decimal', precision: 17, scale: 2 })
  sellingPrice: number;

  @Column({ name: 'etd_date', nullable: true })
  etdDate: Date;

  @Column({ name: 'sales_co_code', nullable: true })
  salesCoCode: string;

  @Column({ name: 'sales_co', nullable: true })
  salesCo: string;

  @Column({ name: 'sales_co_name', nullable: true })
  salesCoName: string;

  @Column({ name: 'end_customer_code' })
  endCustomerCode: string;

  @Column({ name: 'end_customer' })
  endCustomer: string;

  @Column({ name: 'end_customer_name' })
  endCustomerName: string;

  @Column({ name: 'last_modified_date' })
  lastModifiedDate: Date;

  @Column({ name: 'created_date' })
  createdDate: Date;

  @Column({ name: 'username' })
  @Index()
  username: string;

  @Column({ name: 'material_grade', nullable: true })
  materialGrade: string;

  @Column({ name: 'material_group', nullable: true })
  materialGroup: string;

  @Column({ name: 'package', nullable: true })
  package: string;

  @Column({ name: 'product_color', nullable: true })
  productColor: string;

  @Column({ name: 'product_form', nullable: true })
  productForm: string;

  @Column({ name: 'product_sub', nullable: true })
  productSub: string;

  @Column({ name: 'application', nullable: true })
  application: string;

  @Column({ name: 'product', nullable: true })
  product: string;

  @Column({ name: 'custom_clearance', nullable: true })
  customClearance: string;

  @Column({ name: 'sales_org_code', nullable: true })
  salesOrgCode: string;

  @Column({ name: 'customer_code', nullable: true })
  customerCode: string;

  @Column({ name: 'sales_representative', nullable: true })
  salesRepresentative: string;

  @Column({ name: 'place_of_delivery', nullable: true })
  placeOfDelivery: string;

  @Column({ name: 'bill_to', nullable: true })
  billTo: string;

  @Column({ name: 'payer', nullable: true })
  payer: string;

  @Column({ name: 'incoterms', nullable: true })
  incoterms: string;

  @Column({ name: 'currency', nullable: true })
  currency: string;

  @Column({ name: 'unit', nullable: true })
  unit: string;

  @Column({ name: 'sales_group', nullable: true })
  salesGroup: string;

  @Column({ name: 'sale_quota_type', nullable: true })
  saleQuotaType: string;

  @Column({ name: 'external_po_item_no', nullable: true })
  externalPoItemNo: string;

  @Column({ name: 'com_upfront_domestic', nullable: true })
  comUpfrontDomestic: string;

  @Column({ name: 'transaction_type', nullable: true })
  transactionType: string;

  @Column({ name: 'ship_from', nullable: true })
  shipFrom: string;

  @Column({ name: 'mode_of_transport', nullable: true })
  modeOfTransport: string;

  @Column({ name: 'price_list_type', nullable: true })
  priceListType: string;

  @Column({ name: 'transfer_order', nullable: true })
  transferOrder: boolean;

  @Column({ name: 'sales_partner_trader', nullable: true })
  salesPartnerTrader: string;

  @Column({ name: 'remark_for_external', nullable: true })
  remarkForExternal: string;

  @Column({ name: 'terms_of_payment', nullable: true })
  termsOfPayment: string;

  @Column({ name: 'customer_application', nullable: true })
  customerApplication: string;

  @Column({ name: 'class', nullable: true })
  class: string;

  @Column({ name: 'no_of_container_cal', nullable: true })
  noOfContainerCal: number;

  @Column({ name: 'type_of_packaging', nullable: true })
  typeOfPackaging: string;

  @Column({ name: 'no_of_container', nullable: true })
  noOfContainer: number;

  @Column({ name: 'transport_surcharge', nullable: true })
  transportSurcharge: number;

  @Column({ name: 'com_kickback', nullable: true })
  comKickback: number;

  @Column({ name: 'com_kickback_currency', nullable: true })
  comKickbackCurrency: string;

  @Column({ name: 'com_kickback_t1', nullable: true })
  comKickbackT1: string;

  @Column({ name: 'com_kickback_t1_currency', nullable: true })
  comKickbackT1Currency: string;

  @Column({ name: 'com_kickback_t2', nullable: true })
  comKickbackT2: string;

  @Column({ name: 'com_kickback_t2_currency', nullable: true })
  comKickbackT2Currency: string;

  @Column({ name: 'sales_region', nullable: true })
  salesRegion: string;

  @Column({ name: 'truck_type', nullable: true })
  truckType: string;

  @Column({ name: 'production_site_determine_item', nullable: true })
  productionSiteDetermineItem: string;

  @Column({ name: 'production_site_by_grade', nullable: true })
  productionSiteByGrade: string;

  @Column({ name: 'diff_price', nullable: true })
  diffPrice: number;

  @Column({ name: 'end_cust_price_usd', nullable: true })
  endCustPriceUSD: number;

  @Index()
  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'contract_type', nullable: true })
  contractType: string;

  @Column({ name: 'internal_po_type', nullable: true })
  internalPOType: string;

  @Column({ name: 'delivery_type', nullable: true })
  deliveryType: string;

  @Column({ name: 'sub_sold_to_code', nullable: true })
  subSoldToCode: string;

  @Column({ name: 'remark_for_bank', nullable: true, length: 'max' })
  remarkForBank: string;

  @Column({ name: 'remark_for_internal', nullable: true, length: 'max' })
  remarkForInternal: string;

  @Column({ name: 'internal_order', nullable: true })
  internalOrder: number;

  @Column({ name: 'invoice_split', nullable: true })
  invoiceSplit: string;

  @Column({ name: 'negotiating_bank', nullable: true })
  negotiatingBank: string;

  @Column({ name: 'receiving_bank', nullable: true })
  receivingBank: string;

  @Column({ name: 'advising_bank', nullable: true })
  advisingBank: string;

  @Column({ name: 'insurer', nullable: true })
  insurer: string;

  @Column({ name: 'ship_to_port', nullable: true })
  shipToPort: string;

  @Column({ name: 'contact_person', nullable: true })
  contactPerson: string;

  @Column({ name: 'remark_for_cs', nullable: true })
  remarkForCS: string;

  @Column('int', { name: 'payment_term_level', nullable: true })
  paymentTermLevel: number;

  static mapToTransaction(rawData: any): Transaction {
    const transaction = new Transaction();

    // Assign raw data to the entity properties
    transaction.transactionNumber = rawData.transaction_number;
    transaction.transactionItemNumber = rawData.transaction_item_number;
    transaction.shipToCode = rawData.ship_to_code;
    transaction.shipTo = rawData.ship_to;
    transaction.shipToAddress = rawData.ship_to_address;
    transaction.shipToName = rawData.ship_to_name;
    transaction.soldToCode = rawData.sold_to_code;
    transaction.soldTo = rawData.sold_to;
    transaction.soldToName = rawData.sold_to_name;
    transaction.soldToName1 = rawData.sold_to_name1;
    transaction.soldToName2 = rawData.sold_to_name2;
    transaction.soldToName3 = rawData.sold_to_name3;
    transaction.soldToName4 = rawData.sold_to_name4;
    transaction.soldToAddress = rawData.sold_to_address;
    transaction.soldToStreet1 = rawData.sold_to_street1;
    transaction.soldToStreet2 = rawData.sold_to_street2;
    transaction.soldToStreet3 = rawData.sold_to_street3;
    transaction.soldToStreet4 = rawData.sold_to_street4;
    transaction.soldToStreet5 = rawData.sold_to_street5;
    transaction.soldToPostCode = rawData.sold_to_postcode;
    transaction.soldToDistrict = rawData.sold_to_district;
    transaction.soldToCity = rawData.sold_to_city;
    transaction.sellingApproach = rawData.selling_approach;
    transaction.sellingApproachName = rawData.selling_approach_name;
    transaction.productionSite = rawData.production_site;
    transaction.productionSiteName = rawData.production_site_name;
    transaction.salesPartnerCode = rawData.sales_partner_code;
    transaction.salesPartner = rawData.sales_partner;
    transaction.salesPartnerName = rawData.sales_partner_name;
    transaction.paymentTerm = rawData.payment_term;
    transaction.paymentTermName = rawData.payment_term_name;
    transaction.poNumber = rawData.po_number;
    transaction.poDate = rawData.po_date ? new Date(rawData.po_date) : null;
    transaction.channel = rawData.channel;
    transaction.channelName = rawData.channel_name;
    transaction.channelGroup = rawData.channel_group;
    transaction.materialCode = rawData.material_code;
    transaction.commission = rawData.commission;
    transaction.commissionCurrency = rawData.commission_currency;
    transaction.quantity = rawData.quantity;
    transaction.sqType = rawData.sq_type;
    transaction.containerSize = rawData.container_size;
    transaction.sellingPrice = rawData.selling_price;
    transaction.etdDate = rawData.etd_date ? new Date(rawData.etd_date) : null;
    transaction.salesCoCode = rawData.sales_co_code;
    transaction.salesCo = rawData.sales_co;
    transaction.salesCoName = rawData.sales_co_name;
    transaction.endCustomerCode = rawData.end_customer_code;
    transaction.endCustomer = rawData.end_customer;
    transaction.endCustomerName = rawData.end_customer_name;
    transaction.lastModifiedDate = rawData.last_modified_date
      ? new Date(rawData.last_modified_date)
      : null;
    transaction.username = rawData.username;
    transaction.materialGrade = rawData.material_grade;
    transaction.materialGroup = rawData.material_group;
    transaction.package = rawData.package;
    transaction.productColor = rawData.product_color;
    transaction.productForm = rawData.product_form;
    transaction.productSub = rawData.product_sub;
    transaction.application = rawData.application;
    transaction.product = rawData.product;
    transaction.customClearance = rawData.custom_clearance;
    transaction.salesOrgCode = rawData.sales_org_code;
    transaction.customerCode = rawData.customer_code;
    transaction.salesRepresentative = rawData.sales_representative;
    transaction.placeOfDelivery = rawData.place_of_delivery;
    transaction.billTo = rawData.bill_to;
    transaction.payer = rawData.payer;
    transaction.incoterms = rawData.incoterms;
    transaction.currency = rawData.currency;
    transaction.unit = rawData.unit;
    transaction.salesGroup = rawData.sales_group;
    transaction.saleQuotaType = rawData.sale_quota_type;
    transaction.externalPoItemNo = rawData.external_po_item_no;
    transaction.comUpfrontDomestic = rawData.com_upfront_domestic;
    transaction.transactionType = rawData.transaction_type;
    transaction.shipFrom = rawData.ship_from;
    transaction.modeOfTransport = rawData.mode_of_transport;
    transaction.priceListType = rawData.price_list_type;
    transaction.transferOrder = rawData.transfer_order;
    transaction.salesPartnerTrader = rawData.sales_partner_trader;
    transaction.remarkForExternal = rawData.remark_for_external;
    transaction.termsOfPayment = rawData.terms_of_payment;
    transaction.customerApplication = rawData.customer_application;
    transaction.class = rawData.class;
    transaction.noOfContainerCal = rawData.no_of_container_cal;
    transaction.typeOfPackaging = rawData.type_of_packaging;
    transaction.noOfContainer = rawData.no_of_container;
    transaction.transportSurcharge = rawData.transport_surcharge;
    transaction.comKickback = rawData.com_kickback;
    transaction.comKickbackCurrency = rawData.com_kickback_currency;
    transaction.comKickbackT1 = rawData.com_kickback_t1;
    transaction.comKickbackT1Currency = rawData.com_kickback_t1_currency;
    transaction.comKickbackT2 = rawData.com_kickback_t2;
    transaction.comKickbackT2Currency = rawData.com_kickback_t2_currency;
    transaction.salesRegion = rawData.sales_region;
    transaction.truckType = rawData.truck_type;
    transaction.productionSiteDetermineItem =
      rawData.production_site_determine_item;
    transaction.productionSiteByGrade = rawData.production_site_by_grade;
    transaction.diffPrice = rawData.diff_price;
    transaction.endCustPriceUSD = rawData.end_cust_price_usd;
    transaction.email = rawData.email;
    transaction.contractType = rawData.contract_type;
    transaction.internalPOType = rawData.internal_po_type;
    transaction.deliveryType = rawData.delivery_type;
    transaction.subSoldToCode = rawData.sub_sold_to_code;
    transaction.remarkForBank = rawData.remark_for_bank;
    transaction.remarkForInternal = rawData.remark_for_internal;
    transaction.internalOrder = rawData.internal_order;
    transaction.invoiceSplit = rawData.invoice_split;
    transaction.negotiatingBank = rawData.negotiating_bank;
    transaction.receivingBank = rawData.receiving_bank;
    transaction.advisingBank = rawData.advising_bank;
    transaction.insurer = rawData.insurer;
    transaction.shipToPort = rawData.ship_to_port;
    transaction.contactPerson = rawData.contact_person;
    transaction.remarkForCS = rawData.remark_for_cs;
    transaction.transactionId = rawData.transaction_id;
    transaction.paymentTermLevel = rawData.payment_term_level;
    transaction.transactionItemId = rawData.transaction_item_id;
    transaction.createdDate = rawData.created_date
      ? new Date(rawData.created_date)
      : null;
    return transaction;
  }
}
