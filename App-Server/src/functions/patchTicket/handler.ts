import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { updateStuff } from '../../../db/DAO';

const pTicket: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const d = await updateStuff(event.body.id, 'ticket', event.body.what, event.body.change);
  return formatJSONResponse({data:d, event});
}

export const main = middyfy(pTicket);
