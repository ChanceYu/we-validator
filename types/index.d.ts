declare module "we-validator" {
    type Rule = Function | RegExp;
    type RuleOption = { rule: Rule; message: string };
    type Options = { 
      rules?: object,
      messages?: object,
      onMessage?: Function,
      multiCheck?: boolean
    }
    type ErrorParam = {
      name: string;
      value: any;
      param: any;
      rule: string;
      msg: string;
    }
    class WeValidator {
      constructor(options?: Options);
      static RULES: object;
      static onMessage?: (params: ErrorParam | Record<string, ErrorParam>) => void;
      static required: (value: any) => boolean;
      static addRule(ruleName: string, ruleOption: RuleOption): void;
      static checkValue(ruleName: string, value: any, param?: any, skip?: boolean): boolean;
      options: Options;
      data?: object;
      required: (value: any) => boolean;
      checkData(data: object, onMessage?: Function, showMessage?: boolean, fieldMap?: object): boolean;
      checkFields(data: object, fields: Array<string>, onMessage?: Function, showMessage?: boolean): boolean;
      isValid(data: object, fields?: Array<string>): boolean;
      addRules(options?: Options): void;
      removeRules(fields: Array<string>): void;
    }
    export = WeValidator
  }
  
