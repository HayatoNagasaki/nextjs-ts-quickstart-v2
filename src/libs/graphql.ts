import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server-micro';

const prisma = new PrismaClient();

const executeGraphQL = (query: any, schema: any) => {
  const { typeDefs, resolvers } = schema;
  const data: any = {};

  const fields: any[] = [];
  typeDefs.definitions.forEach((definition: any) => {
    let name = definition.name.value;
    let kind = definition.kind;

    if (
      (name == 'Query' || name == 'Mutation') &&
      kind === 'ObjectTypeDefinition'
    ) {
      definition.fields.forEach((field: any) => {
        let _name = field.name.value;
        let _arguments = field.arguments.map((argument: any) => {
          return {
            name: argument.name.value,
            type: argument.type.name?.value || undefined,
          };
        });
        let _type =
          field.type.type?.type?.type?.name?.value ||
          field.type.type?.name.value ||
          field.type.name?.value;

        fields.push({
          defKind: kind,
          defName: name,
          name: _name,
          arguments: _arguments,
          type: _type,
        });
      });
    }
  });

  const queryDefs = gql`
    ${query}
  `;
  queryDefs.definitions.forEach((definition: any) => {
    let name = definition.name?.value;
    let kind = definition.kind;

    const getNameFromSelection = (selection: any) => {
      return selection.name.value;
    };

    const getArgumentFromSelection = (selection: any) => {
      return selection.arguments.map((argument: any) => {
        return argument.value.value;
      });
    };

    const getSelectionSetFromSelection = (selection: any) => {
      return selection.selectionSet?.selections.map((selection: any) => {
        return {
          name: selection.name.value,
        };
      });
    };

    if (kind === 'OperationDefinition') {
      definition.selectionSet.selections.forEach((selection: any) => {
        let _name = getNameFromSelection(selection);
        let _arguments = getArgumentFromSelection(selection);
        let _selectionSet = getSelectionSetFromSelection(selection);

        let _resolvers: any = {};
        if (definition.operation === 'query') {
          _resolvers = resolvers.Query;
        } else if (definition.operation === 'mutation') {
          _resolvers = resolvers.Mutation;
        }

        // Execute resolver
        data[_name] = _resolvers[_name](..._arguments);
        if (data[_name] instanceof Promise) {
          data[_name].then((result: any) => {
            data[_name] = result;
          });
        }
      });
    }
  });

  // resolve promise
  // Object.keys(data).forEach((key) => {
  //   if (data[key] instanceof Promise) {
  //     data[key].then((result: any) => {
  //       data[key] = result;
  //     });
  //   }
  // });
  return data;
};

export default executeGraphQL;
