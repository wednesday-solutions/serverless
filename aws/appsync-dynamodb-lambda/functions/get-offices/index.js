import {getAllOffices, getOffice} from '../../daos/WednesdayERP';
import {base64Encode, failure, success} from '@utils';

exports.handler = async (event, context, callback) => {
    const args = event.arguments;
    const officeRes = {};
    try {
        if (args.officeId) {
            const officeResponse = await getOffice(args.officeId);
            officeRes.items = officeResponse.Items;
        } else {
            const officeResponse = await getAllOffices({
                limit: args.pagination.limit,
                nextToken: args.pagination.nextToken
            });
            if (officeResponse.LastEvaluatedKey) {
                officeRes.pagination = {nextToken: base64Encode(officeResponse.LastEvaluatedKey)};
            }
            officeRes.items = officeResponse.Items;
        }
    } catch (err) {
        return failure(callback, err)
    }
    return success(callback, officeRes);
};
