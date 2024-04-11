async function GetContracts(req, res) {
    const { Contract } = req.app.get('models')
    const contract = await Contract.findAll()
    if (!contract) return res.status(404).end()
    return res.json(contract)
}
async function GetContractById(req, res) {
    const { Contract } = req.app.get('models')
    const { id } = req.params
    const contract = await Contract.findOne({ where: { id, ClientId: req.profile.id } })
    if (!contract) return res.status(404).end()
    return res.json(contract)
}
module.exports = ({
    GetContracts,
    GetContractById
})