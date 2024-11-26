interface HeaderInfo {
  SourceSystem: string;
  messageId: string | null;
  serialization: string | null;
  requestedBy: string | null;
  Action: string;
  SendReplicate?: boolean;
}

export interface CustomerAccount {
  Account_ID__c: string;
}

export class InquiryInfo {
  Id: string;
  Name?: string;
  StageName?: string;
  Approval_Status_Extend_Park_Validity__c?: string;

  Remark_for_Bank__c?: string;
  Logistics_Co__r?: CustomerAccount;
}

export interface InquiryItem {
  Com_Upfront_Domestic__c: any;
  Container_Size__c: any;
  Id?: string;
  Name?: string;
  SalesOrg__c?: string;
  Sales_Group__c: string;
  Channel__c: string;
  MaterialCode__r?: {
    Name: string;
  };
  Class__c?: string;
  Unit__c: string;
  RemarkforApproval__c?: string;
}

export interface RequestCreateUpdateInquiry {
  HeaderInfo: HeaderInfo;
  InquiryInfo: InquiryInfo;
  InquiryItemList: InquiryItem[];
  CancelItemInfo?: InquiryCancelItem[];
}

export interface RequestUpdateParkInquiry {
  HeaderInfo: HeaderInfo;
  InquiryInfo: InquiryParkInfo;
  InquiryItemList: InquiryParkItem[];
}

export interface RequestCloneInquiry {
  HeaderInfo?: HeaderInfo;
  InquiryInfo?: InquiryParkInfo;
  InquiryItemList?: InquiryParkItem[];
}

export interface InquiryCancelItem {
  Id: string;
}

export interface InquiryParkItem {
  Id: string;
}
export interface InquiryParkInfo {
  Id: string;
}
