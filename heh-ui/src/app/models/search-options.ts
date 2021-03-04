import { SelectOption } from './select-option';

export interface SearchOptions {
    btnLabel?: string;
    selectOptions: SelectOption;
    multiSelectOptions: SelectOption[];
    dateOptions?: {
        label: string;
    };
}
