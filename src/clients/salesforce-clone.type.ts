export interface CloneInquiryInfo {
  attributes?: {
    type?: string;
    url?: string;
  };
  ExchangeRate__c?: string;
  CustomerName__c?: string;
  Bill_To__c?: string;
  CreatedById?: string;
  End_Customer__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  RecordType?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Name?: string;
  };
  LastModifiedBy?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Email?: string;
  };
  Payer__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  Place_of_Delivery__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  Sales_Representative__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  SoldTo__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  ShipTo__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  Sales_Co__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  CustomerName__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  Bill_To__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Account_ID__c?: string;
  };
  CreatedBy?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Email?: string;
  };
  ExchangeRate__r?: {
    attributes?: {
      type?: string;
      url?: string;
    };
    Id?: string;
    Exchange_Rate__c?: number;
  };
}

import { InquiryItem } from './salesforce.type';

export interface CloneInquiryResponse {
  Status: string;
  Serialization?: any;
  InquiryItemList?: InquiryItem[];
  InquiryInfo?: CloneInquiryInfo;
  Error?: any;
}
