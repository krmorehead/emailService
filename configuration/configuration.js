var global_interfaces_1 = require("../src/Globals/global_interfaces");
exports.global_configuration = {
    integrations: [{
            slug: 'spendgrid',
            type: global_interfaces_1.API_Request_Types.Post,
            api_ref: 'spendgrid_api_key'
        },
        {
            slug: 'snailgun',
            type: global_interfaces_1.API_Request_Types.Post,
            api_ref: 'snailgun_api_key'
        }]
};
;
