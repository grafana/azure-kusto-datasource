import { QueryEditorPropertyType, QueryEditorFunctionDefinition, QueryEditorFunctionParameter } from '../types';

export class QueryEditorFunctionBuilder {
  private label: string;
  private parameters: QueryEditorFunctionParameter[] = [];

  constructor(private value: string, private functions: QueryEditorFunctionDefinition[]) {
    this.label = value;
  }

  withLabel(label: string) {
    this.label = label;
    return this;
  }

  withParameter(name: string, type: QueryEditorPropertyType, description: string) {
    this.parameters.push({ name, type, description });
    return this;
  }

  add(): void {
    this.functions.push({
      value: this.value,
      label: this.label,
      type: QueryEditorPropertyType.Function,
      parameters: this.parameters,
    });
  }
}
