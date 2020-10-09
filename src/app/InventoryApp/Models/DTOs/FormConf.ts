export class FormConf {
    FieldsConf: FieldConf[] = [];
    Title?: string;
}

class FieldConf {
    DataField: String;
    EditorOptions?: {};
    EditorType?: 'dxAutocomplete' | 'dxCalendar' | 'dxCheckBox' | 'dxColorBox' | 'dxDateBox' | 'dxDropDownBox' | 'dxHtmlEditor' | 'dxLookup' | 'dxNumberBox' | 'dxRadioGroup' | 'dxRangeSlider' | 'dxSelectBox' | 'dxSlider' | 'dxSwitch' | 'dxTagBox' | 'dxTextArea' | 'dxTextBox';
    Validation?: boolean;
    Validations?: string;
    Disabled?: boolean;
}



class ValidationConf {
    type: string;
}