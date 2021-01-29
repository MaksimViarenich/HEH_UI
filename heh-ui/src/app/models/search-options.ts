import { SelectOption } from './select-option';

export interface SearchOptions {
    btnLabel?: string;
    selectOptions: {
        label: string;
        options: SelectOption[];
    };
    multiSelectOptions: {
        label: string;
        options: SelectOption[];
    }[];
    dateOptions?: {
        label: string;
    };
}
