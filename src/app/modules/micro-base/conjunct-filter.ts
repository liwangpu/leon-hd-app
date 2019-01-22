import { IQueryFilter } from "./interfaces/i-query-filter";
import { QueryOperateEnum } from "./enums/query-operate-enum";

export function ConjunctFilter(advanceQueryFilters?: Array<IQueryFilter>): string {
    let queryPart = '';
    if (advanceQueryFilters && advanceQueryFilters.length) {
        for (let item of advanceQueryFilters) {
            let operateStr = '';
            switch (item.operate) {
                case QueryOperateEnum.equal:
                    operateStr = '=';
                    break;
                default:
                    operateStr = '=';
                    break;
            }
            queryPart += `${item.field}${operateStr}${item.value}&`;
        }
    }
    return queryPart;
}//conjunctFilter