import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveRatePolicy1678644466247 implements MigrationInterface {
  name = 'RemoveRatePolicy1678644466247';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // const rateRepo = queryRunner.manager.getRepository(Rate);
    // const rates = await rateRepo.find({
    //   select: {
    //     id: true,
    //     policy: true,
    //   },
    // });
    // const policyRepo = queryRunner.manager.getRepository(PolicyEntity);
    // for (const rate of rates) {
    //   let policy;
    //   if (rate.policy === PolicyFreeCancellationLimit.NON_REFUNDABLE) {
    //     policy = await policyRepo.save(
    //       policyRepo.create({
    //         cancel_penalty: PolicyCancelPenalty.TOTAL_OF_RESERVATION,
    //         free_cancel: PolicyFreeCancellationLimit.NON_REFUNDABLE,
    //         no_show_penalty: PolicyNoShowPenalty.TOTAL_OF_RESERVATION,
    //       }),
    //     );
    //   } else {
    //     policy = await policyRepo.save(
    //       policyRepo.create({
    //         cancel_penalty: PolicyCancelPenalty.FIRST_DAY,
    //         free_cancel: PolicyFreeCancellationLimit.DAY_SIX_OCLOCK,
    //         no_show_penalty: PolicyNoShowPenalty.FIRST_DAY,
    //       }),
    //     );
    //   }
    //   await rateRepo.update(rate.id, {
    //     policy_id: policy.id,
    //   });
    // }
    // await queryRunner.query(`ALTER TABLE "rates" DROP COLUMN "policy"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rates" ADD "policy" integer NOT NULL`,
    );
  }
}
