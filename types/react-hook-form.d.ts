declare module 'react-hook-form' {
  export type FieldValues = Record<string, any>;
  export type FieldPath<T = any> = string;

  export interface UseFormReturn<T = any> {
    register: (name: string, options?: any) => any;
    handleSubmit: (onValid: (data: T) => void, onInvalid?: (errors: any) => void) => (e?: any) => void;
    reset: (values?: any) => void;
    setValue: (name: string, value: any, options?: any) => void;
    getValues: (name?: string) => any;
    getFieldState: (name: string, formState?: any) => any;
    formState: {
      errors: any;
      isSubmitting: boolean;
      isDirty: boolean;
      dirtyFields: any;
      touchedFields: any;
      isValid: boolean;
    };
    watch: (name?: string) => any;
    control: any;
  }

  export interface ControllerProps<T = any, U = any, V = any> {
    name: string;
    control: any;
    render: (props: { field: any; fieldState: any; formState: any }) => React.ReactNode;
    defaultValue?: V;
    rules?: any;
    shouldUnregister?: boolean;
  }

  export function useForm<T = any>(props?: any): UseFormReturn<T>;
  export function useFormContext<T = any>(): UseFormReturn<T>;
  export const FormProvider: any;
  export const Controller: any;
  export const Form: any;
}