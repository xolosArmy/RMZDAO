// Cada thread se identifica con THREAD_<ID>_NFT
// Posee un contador decreciente. Puede renovarse vía heartbeats.
// Al recibir una transacción "heartbeat" se restablece el contador.
// Al expirar (contador = 0), su única salida válida es "check-in" con el covenant principal para consolidar estado.

<check_thread_nft>
<decrement_lifetime_or_heartbeat_renew>
<allow_checkin_to_DAO_root>
OP_VERIFY
