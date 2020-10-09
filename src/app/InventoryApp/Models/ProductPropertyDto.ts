import { ProductTypeAndPropertyDto } from './ProductTypeAndPropertyDto';

export interface ProductPropertyDto {
    Id: number;
    DataField: string;
    Type: string;
    Translate: string;
    EditorType: 'dxAutocomplete' | 'dxCalendar' | 'dxCheckBox' | 'dxColorBox' | 'dxDateBox' | 'dxDropDownBox' | 'dxHtmlEditor' | 'dxLookup' | 'dxNumberBox' | 'dxRadioGroup' | 'dxRangeSlider' | 'dxSelectBox' | 'dxSlider' | 'dxSwitch' | 'dxTagBox' | 'dxTextArea' | 'dxTextBox';
    FormItemEditorOptions: string;
    GridColumnEditorOptions: string;
    Validation: string;
    ValidationConf: boolean;
    Disabled: boolean;
    GridColumnConf: string;
    ProductTypeAndProperties: ProductTypeAndPropertyDto[];
}