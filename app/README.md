### POST API CDR: /get/cdr
```
curl -d '{"callid":"1bbe7bd220786cbd", "from_time":"1543249025", "to_time":"1543259025"}' -H "Content-Type: application/json" -X POST http://server.address:18088/get/rtp
```

#### REPLY CDR
```
[{"ID":4,"calldate":"2018-11-22T23:27:06.000Z","callend":"2018-11-22T23:27:17.000Z","duration":11,"connect_duration":11,"progress_time":0,"first_rtp_time":0,"caller":"259","caller_domain":"sip.botauro.com","caller_reverse":"952","callername":"","callername_reverse":"","called":"5000","called_domain":"sip.botauro.com","called_reverse":"0005","sipcallerip":2420906711,"sipcallerport":37439,"sipcalledip":1833255245,"sipcalledport":5060,"whohanged":"caller","bye":3,"lastSIPresponse_id":1,"lastSIPresponseNum":200,"reason_sip_cause":null,"reason_sip_text_id":null,"reason_q850_cause":null,"reason_q850_text_id":null,"sighup":0,"dscp":11776,"a_index":0,"b_index":1,"a_payload":0,"b_payload":0,"a_saddr":2420906711,"b_saddr":1833255245,"a_received":567,"b_received":456,"a_lost":0,"b_lost":0,"a_ua_id":1,"b_ua_id":2,"a_avgjitter_mult10":1,"b_avgjitter_mult10":5,"a_maxjitter":1,"b_maxjitter":9,"a_sl1":0,"a_sl2":0,"a_sl3":0,"a_sl4":0,"a_sl5":0,"a_sl6":0,"a_sl7":0,"a_sl8":0,"a_sl9":0,"a_sl10":0,"a_d50":0,"a_d70":0,"a_d90":0,"a_d120":0,"a_d150":0,"a_d200":0,"a_d300":0,"b_sl1":0,"b_sl2":0,"b_sl3":0,"b_sl4":0,"b_sl5":0,"b_sl6":0,"b_sl7":0,"b_sl8":0,"b_sl9":0,"b_sl10":0,"b_d50":0,"b_d70":1,"b_d90":0,"b_d120":0,"b_d150":0,"b_d200":0,"b_d300":0,"a_mos_lqo_mult10":null,"b_mos_lqo_mult10":null,"a_mos_f1_min_mult10":45,"a_mos_f2_min_mult10":45,"a_mos_adapt_min_mult10":45,"a_mos_xr_min_mult10":null,"b_mos_f1_min_mult10":45,"b_mos_f2_min_mult10":45,"b_mos_adapt_min_mult10":40,"b_mos_xr_min_mult10":null,"a_mos_f1_mult10":45,"a_mos_f2_mult10":45,"a_mos_adapt_mult10":45,"a_mos_xr_mult10":null,"b_mos_f1_mult10":45,"b_mos_f2_mult10":45,"b_mos_adapt_mult10":40,"b_mos_xr_mult10":null,"a_rtcp_loss":0,"a_rtcp_maxfr":0,"a_rtcp_avgfr_mult10":0,"a_rtcp_maxjitter":0,"a_rtcp_avgjitter_mult10":0,"b_rtcp_loss":0,"b_rtcp_maxfr":0,"b_rtcp_avgfr_mult10":0,"b_rtcp_maxjitter":0,"b_rtcp_avgjitter_mult10":0,"a_last_rtp_from_end":0,"b_last_rtp_from_end":0,"a_rtcp_fraclost_pktcount":0,"b_rtcp_fraclost_pktcount":0,"a_rtp_ptime":20,"b_rtp_ptime":20,"payload":0,"jitter_mult10":5,"mos_min_mult10":45,"a_mos_min_mult10":45,"b_mos_min_mult10":45,"packet_loss_perc_mult1000":0,"a_packet_loss_perc_mult1000":0,"b_packet_loss_perc_mult1000":0,"delay_sum":80,"a_delay_sum":0,"b_delay_sum":80,"delay_avg_mult100":8000,"a_delay_avg_mult100":0,"b_delay_avg_mult100":8000,"delay_cnt":1,"a_delay_cnt":0,"b_delay_cnt":1,"rtcp_avgfr_mult10":0,"rtcp_avgjitter_mult10":0,"lost":0,"caller_clipping_div3":null,"called_clipping_div3":null,"caller_silence":null,"called_silence":null,"caller_silence_end":null,"called_silence_end":null,"response_time_100":14,"response_time_xxx":35,"max_retransmission_invite":1,"flags":null,"id_sensor":null,"price_operator_mult100":null,"price_operator_currency_id":255,"price_customer_mult100":null,"price_customer_currency_id":255,"callid":"1bbe7bd220786cbd"}]
```

### POST API RTP PCAP: /get/rtp
```
curl -d '{"callid":"1bbe7bd220786cbd", "from_time":"1543249025", "to_time":"1543259025", "filetype":"pcap"}' -H "Content-Type: application/json" -X POST http://server.address:18088/get/rtp
```

### POST API RTP AUDIO: /get/rtp
```
curl -d '{"callid":"1bbe7bd220786cbd", "from_time":"1543249025", "to_time":"1543259025", "filetype":"ogg"}' -H "Content-Type: application/json" -X POST http://server.address:18088/get/rtp
```

