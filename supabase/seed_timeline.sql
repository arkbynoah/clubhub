-- ClubHub Timeline Events Seed Data

insert into timeline_events (id, club_id, event_name, event_date, is_urgent, is_confirmed)
values

  -- QTMA
  (gen_random_uuid(), (select id from clubs where slug = 'qtma'), 'Apps Open',              'March 7, 11:59PM',                        false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtma'), 'Info Session',           'March 9, 5:30PM — Goodes Hall 120',        false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtma'), 'Apps Due',               'March 15, 11:59PM',                        false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtma'), 'First Round Interviews', 'March 16–19',                              false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtma'), 'Second Round Interviews','March 20–22',                              false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtma'), 'Decisions',              'March 23',                                 false, true),

  -- CREO Solutions
  (gen_random_uuid(), (select id from clubs where slug = 'creo-solutions'), 'Apps Due',           'Feb 28, 11:59PM',  true,  true),
  (gen_random_uuid(), (select id from clubs where slug = 'creo-solutions'), 'First Round',        'March 2–4',        false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'creo-solutions'), 'Casing Workshop',    'March 5',          false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'creo-solutions'), 'Case Buddy Program', 'March 5–8',        false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'creo-solutions'), 'Second Round',       'March 9–10',       false, true),

  -- Limestone Capital
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Coffee Chat Sign-Ups',    'Feb 24 — via bio link',                   false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Info Session',            'March 3, 5:30–7PM — Goodes 118',          false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Non-Trad Finance Panel',  'March 4, 5:30–6:30PM — Goodes 151',       false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Public Meeting',          'March 5, 5:30–7:30PM — Goodes 102',       false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Resume Review',           'March 10, 5:30–6:30PM — Goodes 108',      false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Apps Released',           'March 7, 11:59PM',                        false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Apps Due',                'March 15, 11:59PM',                       false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'First Round',             'March 16–18, in-person',                  false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Second Round',            'March 20 — Zoom',                         false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'limestone-capital'), 'Decisions',               'March 23, 8AM',                           false, true),

  -- QUIC
  (gen_random_uuid(), (select id from clubs where slug = 'quic'), 'Coffee Chat Reg Closes', 'March 2 — via bio link',          true, true),
  (gen_random_uuid(), (select id from clubs where slug = 'quic'), 'Info Session',           'March 2, 5:30–7:30PM — Goodes 120', true, true),

  -- QCA
  (gen_random_uuid(), (select id from clubs where slug = 'qca'), 'Info Session',         'March 4, 5:30–6:30PM', false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qca'), 'Written Apps Released','March 7',              false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qca'), 'Apps Due',             'March 15, 11:59PM',    false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qca'), 'Interviews',           'March 16–22',          false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qca'), 'Decisions',            'March 23',             false, true),

  -- QSC
  (gen_random_uuid(), (select id from clubs where slug = 'qsc'), 'Info Session',           'Feb 26, 5:30–6:30PM — Goodes Hall 302', true,  true),
  (gen_random_uuid(), (select id from clubs where slug = 'qsc'), 'Apps Due',               'March 2',                               true,  true),
  (gen_random_uuid(), (select id from clubs where slug = 'qsc'), 'First Round Interviews', 'March 3–5',                             false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qsc'), 'Case Workshop',          'March 7',                               false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qsc'), 'Second Round Interviews','March 9–10',                            false, true),

  -- QTC
  (gen_random_uuid(), (select id from clubs where slug = 'qtc'), 'Coffee Chat Reg Opens',  'Feb 26, 8AM',          true,  true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtc'), 'Coffee Chat Reg Closes', 'March 6, 11:59PM',     false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtc'), 'Info Session',           'March 4, 5:30PM — Goodes 305', false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtc'), 'Written Apps Open',      'March 7, 11:59PM',     false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtc'), 'Apps Close',             'March 15, 11:59PM',    false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtc'), 'First Round Interviews', 'March 16–18',          false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtc'), 'Second Round Interviews','March 19–21',          false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qtc'), 'Offers Extended',        'March 22',             false, true),

  -- HSL
  (gen_random_uuid(), (select id from clubs where slug = 'hsl'), 'Apps Open',  'Feb 28, 11:59PM', true,  true),
  (gen_random_uuid(), (select id from clubs where slug = 'hsl'), 'Apps Due',   'March 8, 11:59PM',false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'hsl'), 'Interviews', 'March 9–15',      false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'hsl'), 'Decisions',  'March 16',        false, true),

  -- QEC
  (gen_random_uuid(), (select id from clubs where slug = 'qec'), 'Coffee Chat Signups', 'Feb 24 – March 7 — link in bio', false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qec'), 'Written Apps Open',  'March 7, 11:59PM',               false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qec'), 'Apps Due',           'March 15, 11:59PM',              false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qec'), 'Interviews',         'March 16–22',                    false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qec'), 'Offers Sent',        'March 23',                       false, true),

  -- ICBC
  (gen_random_uuid(), (select id from clubs where slug = 'icbc'), 'Coffee Chats',  'Feb 23 – March 15 — register by March 8', false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'icbc'), 'Written Apps',  'March 9–15 — via ComSoc Shop',            false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'icbc'), 'Interviews',    'March 16–20',                             false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'icbc'), 'Final Decision','March 23',                                false, true),

  -- QCIB
  (gen_random_uuid(), (select id from clubs where slug = 'qcib'), 'Apps Close',        'Feb 28, 11:59PM',       true,  true),
  (gen_random_uuid(), (select id from clubs where slug = 'qcib'), 'Interviews',        'March 1–4 — via Zoom',  false, true),
  (gen_random_uuid(), (select id from clubs where slug = 'qcib'), 'Offers Announced',  'March 6',               false, true),

  -- QUFN
  (gen_random_uuid(), (select id from clubs where slug = 'qufn'), 'Apps Open (est.)',  '~March 8, 11:59PM', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qufn'), 'Apps Due (est.)',   '~March 15, 11:59PM',false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qufn'), 'Interviews (est.)', 'March 18–21',       false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qufn'), 'Offers (est.)',     'March 23–24',       false, false),

  -- QSCOR
  (gen_random_uuid(), (select id from clubs where slug = 'qscor'), 'Apps Released (est.)', '~March 8',    false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qscor'), 'Apps Due (est.)',      '~March 15',   false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qscor'), 'Interviews (est.)',    'March 16–22', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qscor'), 'Decisions (est.)',     '~March 23',   false, false),

  -- QSIA
  (gen_random_uuid(), (select id from clubs where slug = 'qsia'), 'Written Apps (est.)', 'March 8–15',   false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qsia'), 'Interviews (est.)',   'March 16–22',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qsia'), 'Offers (est.)',       '~March 23',    false, false),

  -- QRF
  (gen_random_uuid(), (select id from clubs where slug = 'qrf'), 'Written Apps (est.)', '~March 8–15',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qrf'), 'Interviews (est.)',   'March 18–22',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qrf'), 'Offers (est.)',       'March 23, 8AM',false, false),

  -- QIC
  (gen_random_uuid(), (select id from clubs where slug = 'qic'), 'Apps Released (est.)', '~March 10',   false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qic'), 'Apps Due (est.)',      '~March 18',   false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qic'), 'Interviews (est.)',    'March 19–22', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qic'), 'Decisions (est.)',     '~March 23',   false, false),

  -- QRIA
  (gen_random_uuid(), (select id from clubs where slug = 'qria'), 'Coffee Chats (est.)', 'Feb 14 – March 14', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qria'), 'Apps Open (est.)',    '~March 10',         false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qria'), 'Info Session (est.)', '~March 11, 6PM',    false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qria'), 'Apps Close (est.)',   '~March 16',         false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qria'), 'Interviews (est.)',   'March 17–22',       false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qria'), 'Offers (est.)',       '~March 23',         false, false),

  -- QCLA
  (gen_random_uuid(), (select id from clubs where slug = 'qcla'), 'Written Apps (est.)', '~March 8–15',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qcla'), 'Interviews (est.)',   'March 16–22',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qcla'), 'Decisions (est.)',    '~March 23',    false, false),

  -- QEIC
  (gen_random_uuid(), (select id from clubs where slug = 'qeic'), 'Coffee Chat Reg (est.)', '~March 8',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qeic'), 'Apps Open (est.)',       '~March 8',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qeic'), 'Apps Close (est.)',      '~March 15', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qeic'), 'Interviews (est.)',      'March 18–21',false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qeic'), 'Offers (est.)',          '~March 23', false, false),

  -- SBBA
  (gen_random_uuid(), (select id from clubs where slug = 'sbba'), 'Apps Open (est.)',  '~March 8',    false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'sbba'), 'Apps Close (est.)', '~March 15',   false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'sbba'), 'Interviews (est.)', 'March 21–22', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'sbba'), 'Decisions (est.)',  '~March 23',   false, false),

  -- QGM
  (gen_random_uuid(), (select id from clubs where slug = 'qgm'), 'Info Booth',               'GH Atrium — Feb 25 + March 4–6',    false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qgm'), 'Info Session (est.)',       '~March 5, 5:30PM — GH102',          false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qgm'), 'Coffee Chats Close (est.)', '~March 7',                          false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qgm'), 'Apps Drop (est.)',          '~March 9',                          false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qgm'), 'Apps Due (est.)',           '~March 16',                         false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qgm'), 'Offers (est.)',             '~March 23',                         false, false),

  -- Queen's Capital
  (gen_random_uuid(), (select id from clubs where slug = 'queens-capital'), 'Coffee Chat Sign-ups (est.)', '~Feb 28',    false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'queens-capital'), 'Apps Released (est.)',        '~March 7',   false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'queens-capital'), 'Apps Due (est.)',             '~March 15',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'queens-capital'), 'Offers (est.)',               '~March 23',  false, false),

  -- EDGE Queen's
  (gen_random_uuid(), (select id from clubs where slug = 'edge-queens'), 'Apps Drop (est.)', '~March 8',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'edge-queens'), 'Apps Due (est.)',  '~March 15', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'edge-queens'), 'Offers (est.)',    '~March 24', false, false),

  -- SMC
  (gen_random_uuid(), (select id from clubs where slug = 'smc'), 'Apps Open (est.)',   '~March 8',          false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'smc'), 'Info Session (est.)','~March 11, 5:30PM', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'smc'), 'Apps Close (est.)',  '~March 15',         false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'smc'), 'Decisions (est.)',   '~March 23',         false, false),

  -- Q3C
  (gen_random_uuid(), (select id from clubs where slug = 'q3c'), 'Apps Released (est.)', '~March 8',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'q3c'), 'Apps Due (est.)',      '~March 15', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'q3c'), 'Offers (est.)',        '~March 23', false, false),

  -- ACE Queen's
  (gen_random_uuid(), (select id from clubs where slug = 'ace-queens'), 'Apps Open (est.)', '~March 8',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'ace-queens'), 'Apps Due (est.)',  '~March 15', false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'ace-queens'), 'Decisions (est.)', '~March 23', false, false),

  -- QSIC
  (gen_random_uuid(), (select id from clubs where slug = 'qsic'), 'Apps Go Live (est.)', '~March 11',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qsic'), 'Apps Due (est.)',     '~March 18',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qsic'), 'Interviews (est.)',   'March 19–22',false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qsic'), 'Offers (est.)',       '~March 23',  false, false),

  -- QAA
  (gen_random_uuid(), (select id from clubs where slug = 'qaa'), 'Written Apps Released (est.)', '~March 8',   false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qaa'), 'Apps Due (est.)',              '~March 15',  false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qaa'), 'Interviews (est.)',            'March 18–22',false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qaa'), 'Decisions (est.)',             '~March 24',  false, false),

  -- QPCG
  (gen_random_uuid(), (select id from clubs where slug = 'qpcg'), 'Coffee Chat Sign-ups Close', '~March 2',                              true,  false),
  (gen_random_uuid(), (select id from clubs where slug = 'qpcg'), 'Info Session',               'March 4, 5:30–6:30PM — Goodes 103',    false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qpcg'), 'Apps Released (est.)',       '~March 8',                             false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qpcg'), 'Apps Due (est.)',            '~March 15',                            false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qpcg'), 'First Round (est.)',         'March 18–19',                          false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qpcg'), 'Second Round (est.)',        'March 22',                             false, false),
  (gen_random_uuid(), (select id from clubs where slug = 'qpcg'), 'Offers (est.)',              '~March 23',                            false, false),

  -- QSA
  (gen_random_uuid(), (select id from clubs where slug = 'qsa'), 'Apps (est.)', 'Timeline not yet released', false, false);
