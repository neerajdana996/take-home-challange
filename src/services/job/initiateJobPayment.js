const { Job, Contract, Profile, sequelize } = require("../../model");

async function initiateJobPayment(jobId, profile) {
    try {

        const jobToPay = await Job.findOne({
            where: { id: jobId },
        });
        if (!jobToPay) return { message: "Job not found" }
        if (jobToPay.paid) return { message: "Job already paid" }

        const contract = await Contract.findOne({
            where: { id: jobToPay.ContractId, ClientId: profile.id },
        });

        //TODO  validate the contract wether its a valid contract or not

        const contractor = await Profile.findOne({
            where: { id: contract.ContractorId },
        });


        const paymentTransaction = createPaymentTransaction(profile, contractor, jobToPay);
        const transactionId = await sequelize.transaction(paymentTransaction);

        return { message: "Payment successful", transactionId };
    } catch (error) {
        return { message: error.message }
    }
}

const createPaymentTransaction = (profile, contractor, jobToPay) => async (t) => {
    console.log(`Staring paymentProcess -> transactionId - ${t.id}`)

    await Profile.update(
        { balance: profile.balance - jobToPay.price },
        { where: { id: profile.id }, transaction: t }
    );

    await Profile.update(
        { balance: contractor.balance + jobToPay.price },
        { where: { id: contractor.id }, transaction: t }
    );

    await Job.update(
        { paid: true, paymentDate: new Date() },
        { where: { id: jobToPay.id }, transaction: t }
    );
    console.log(`Ending paymentProcess -> transactionId - ${t.id}`)

    return t.id;
};

module.exports = initiateJobPayment;