import { Button, Input, Title } from '../../GlobalStyle';
import {
  ErrorMessage,
  FormGroup,
  Label,
  FieldTitle,
  AddressContainer,
  FormFlex,
} from './Style';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
} from 'react-hook-form';
import { Contact } from '../../ts/interfaces/contacts';
import { getAddress } from '../../services/cepApi';
import {
  editContact,
  getContact,
  postContact,
} from '../../services/contactsApi';
import { useEffect } from 'react';

interface Props {
  type: 'edit' | 'create';
  id?: number;
}

export default function Form(props: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<Contact>({
    defaultValues: {
      phonenumbers: [{ phone: '' }],
      address: [
        {
          street: '',
          zipcode: '',
          district: '',
          city: '',
          state: '',
        },
      ],
      name: '',
    },
  });
  const {
    fields: phoneFields,
    append: phoneAppend,
    remove: phoneRemove,
  } = useFieldArray({
    name: 'phonenumbers',
    control,
  });
  const {
    fields: addressFields,
    append: addressAppend,
    remove: addressRemove,
  } = useFieldArray({
    name: 'address',
    control,
  });

  const setCep = async (index: number) => {
    try {
      let address = await getAddress(getValues(`address.${index}.zipcode`));
      setValue(`address.${index}`, address);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const submitContact = async (data: Contact) => {
    if (props.type === 'create') {
      try {
        await postContact(data);
      } catch (error: any) {
        console.log(error.message);
      }
    } else if (props.type === 'edit') {
      try {
        await editContact({ ...data, id: props.id });
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const getContactData = async () => {
    try {
      if (props.id) {
        let contactData = await getContact(props.id);
        setValue('address', contactData.address);
        setValue('name', contactData.name);
        setValue('phonenumbers', contactData.phonenumbers);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (props.type === 'edit') {
      getContactData();
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(submitContact)}>
      <Title>
        {props.type === 'create'
          ? 'Adicionar'
          : props.type === 'edit'
          ? 'Editar'
          : ''}{' '}
        Contato
      </Title>
      <FormGroup>
        <Label>Nome</Label>
        <Input type="text" {...register('name')}></Input>
        <ErrorMessage></ErrorMessage>
      </FormGroup>
      <FormGroup>
        <FormFlex>
          <FieldTitle>Número(s)</FieldTitle>
          <Button
            type="button"
            onClick={() => {
              phoneAppend({ phone: '' });
            }}
          >
            +
          </Button>
        </FormFlex>

        {phoneFields.map((item, index) => {
          return (
            <div key={item.id}>
              <Label>Número {index + 1}</Label>
              <FormFlex>
                <Input {...register(`phonenumbers.${index}.phone`)} />
                <Button type="button" onClick={() => phoneRemove(index)}>
                  -
                </Button>
              </FormFlex>
              <ErrorMessage></ErrorMessage>
            </div>
          );
        })}
      </FormGroup>
      <FormGroup>
        <FormFlex>
          <FieldTitle>Endereço(s)</FieldTitle>
          <Button
            type="button"
            onClick={() => {
              addressAppend({
                street: '',
                zipcode: '',
                district: '',
                city: '',
                state: '',
              });
            }}
          >
            +
          </Button>
        </FormFlex>

        {addressFields.map((item, index) => {
          return (
            <div key={item.id}>
              <Label>CEP</Label>
              <FormFlex>
                <Input
                  {...register(`address.${index}.zipcode`)}
                  onBlur={() => setCep(index)}
                ></Input>
                <Button type="button" onClick={() => addressRemove(index)}>
                  -
                </Button>
              </FormFlex>

              <ErrorMessage></ErrorMessage>
              <AddressContainer>
                <FieldTitle>Rua</FieldTitle>
                <Input
                  readOnly
                  type="text"
                  {...register(`address.${index}.street`)}
                />
                <FieldTitle>Bairro</FieldTitle>
                <Input
                  readOnly={true}
                  type="text"
                  {...register(`address.${index}.district`)}
                />
                <FieldTitle>Cidade</FieldTitle>
                <Input
                  readOnly
                  type="text"
                  {...register(`address.${index}.city`)}
                />
                <FieldTitle>Estado</FieldTitle>
                <Input
                  readOnly
                  type="text"
                  {...register(`address.${index}.state`)}
                />
              </AddressContainer>
            </div>
          );
        })}
      </FormGroup>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
