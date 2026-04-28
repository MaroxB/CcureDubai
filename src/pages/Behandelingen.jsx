import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Clock, CalendarCheck, Phone, Star, ChevronDown, ChevronUp, ArrowRight, Sparkles } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'

// ─── Image imports ─────────────────────────────────────────────────────────────
import imgCuppingDry      from '/Afbeeldingen/Diensten/Dry-Cupping2.jpg.jpeg'
import imgCuppingBoven    from '/Afbeeldingen/Diensten/Cupping-massage-bovenlichaam.jpg.jpeg'
import imgCuppingBovenRug from '/Afbeeldingen/Diensten/Cupping-massage-bovenlichaam-Rug-1.jpg.jpeg'
import imgHijama          from '/Afbeeldingen/Diensten/hijama-1.jpeg'
import imgCuppingKids     from '/Afbeeldingen/Diensten/Cupping-voor-kinderen.jpg.jpeg'
import imgVuurcupping     from '/Afbeeldingen/Diensten/vuuurCupping.jpg.jpeg'
import imgWetCupping      from '/Afbeeldingen/Diensten/wet-cupping.jpg.jpeg'
import imgVuurcuppingRug  from '/Afbeeldingen/Diensten/Vuurcupping-Rug-en-onderbenen.jpeg'
import imgMagnesium       from '/Afbeeldingen/Diensten/Magnesium-massage.webp'
import imgYeso            from '/Afbeeldingen/Diensten/Yeso-Therapy.jpg.jpeg'
import imgCoollifting     from '/Afbeeldingen/Diensten/Coollifting.jpg'
import imgMesotherapy     from '/Afbeeldingen/Diensten/mesotherapie-new.png'
import imgBasisGelaat     from '/Afbeeldingen/Diensten/Basis-gelaatsvezorging.jpeg'
import imgClassicFacial   from '/Afbeeldingen/Diensten/Classic-facial-Treament.jpg.jpeg'
import imgDermaplaning    from '/Afbeeldingen/Diensten/Dermaplannig.jpg.jpeg'
import imgHydrafacial     from '/Afbeeldingen/Diensten/HydraFacial.jpg.jpeg'
import imgHydrafacialLuxe from '/Afbeeldingen/Diensten/Hydrafacial-luxe.jpg.jpeg'
import imgMicrodermabrasie from '/Afbeeldingen/Diensten/Microdermabrasie.jpg.jpeg'
import imgMicroneedling   from '/Afbeeldingen/Diensten/Microneedling.jpg.jpeg'
import imgCollageen       from '/Afbeeldingen/Diensten/Collageen-.jpg.jpeg'
import imgBioPeel         from '/Afbeeldingen/Diensten/bio-peel.jpg.jpeg'
import imgTiener          from '/Afbeeldingen/Diensten/Tienerbehandeling.jpg.jpeg'
import imgBioPulse        from '/Afbeeldingen/Diensten/BioPulse-therapy.jpg.jpeg'
import imgMilia           from '/Afbeeldingen/Diensten/Gerstekorrels-Milia-1024x680-1.jpg.jpeg'
import imgHolistische     from '/Afbeeldingen/Diensten/Holistische-massage.jpg.jpeg'
import imgHotStone        from '/Afbeeldingen/Diensten/Hot-stone-massage.jpg.jpeg'
import imgVoetreflexo     from '/Afbeeldingen/Diensten/voetreflexololgie.jpg.jpeg'
import imgZwangerschap    from '/Afbeeldingen/Diensten/zwangerschapsmassage.jpg.jpeg'
import imgOntspanning     from '/Afbeeldingen/Diensten/ontspanningsmassage2.jpg.jpeg'
import imgMassageHeader   from '/Afbeeldingen/Diensten/Massageheader_74.webp'
import imgMaderotherapy   from '/Afbeeldingen/Diensten/maderotherapie.jpeg'
import imgDuoMassage      from '/Afbeeldingen/Diensten/duo-massages.jpeg'
import imgBaarmoeder      from '/Afbeeldingen/Diensten/Baarmoeder-massage-2.jpg.jpeg'
import imgHuidscan        from '/Afbeeldingen/Diensten/scan.jpeg'

import imgHoofdmassage    from '/Afbeeldingen/Hoofdmassage.jpg'
import imgWetCuppingNew   from '/Afbeeldingen/Wet-cupping.jpeg'
import imgRugcupping      from '/Afbeeldingen/Rugcupping.jpg'
import imgLymfedrainage   from '/Afbeeldingen/Lymfedrainage.jpg'
import imgVapozone        from '/Afbeeldingen/vapozone.jpg'
import imgMoxa            from '/Afbeeldingen/Moxa.jpg'
import imgOorkaars        from '/Afbeeldingen/oorkaars.webp'
import imgPeeling         from '/Afbeeldingen/Peeling.jpg'
import imgRadiancePeel    from '/Afbeeldingen/Radiance peel.jpg'
import imgPhotoAgingPeel  from '/Afbeeldingen/Photo agin peel.webp'
import imgPlasmaOgen      from '/Afbeeldingen/plasma lifting ogen.webp'
import imgPlasma2         from '/Afbeeldingen/Plasma lifting 2.webp'

const PLACEHOLDER = null

// ─── Treatment data ─────────────────────────────────────────────────────────────
const treatments = {

  fysiotherapie: {
    label: 'Physiotherapy',
    subtitle: 'Body treatments for recovery and wellbeing',
    items: [
      {
        name: 'Body Wrap Treatment',
        duration: '60 min', price: '70 €',
        image: imgYeso,
        benefit: 'Firmer skin, less cellulite, smoother texture',
        desc: 'Originally from America, perfect following cupping or dry skin brushing. You lose centimetres, your skin looks firmer and more beautiful. Improves skin health, combats cellulite and reduces stretch marks.',
      },
      {
        name: 'Head Massage',
        duration: '30 min', price: '30 €',
        image: imgHoofdmassage,
        benefit: 'Relaxation, circulation, stress relief',
        desc: 'A relaxing massage of the head and scalp. Relieves tension and stress, improves circulation and brings immediate calm to the head and neck area.',
      },
    ],
  },

  cupping: {
    label: 'Cupping',
    subtitle: 'Our speciality — dry, fire & wet cupping',
    items: [
      {
        name: 'Cupping Cellulite Massage',
        duration: '90 min', price: '65 €',
        image: imgCuppingDry,
        benefit: 'Firmer legs, reduced cellulite',
        desc: 'Connective tissue massage of the legs, highly effective at reducing cellulite (orange peel skin). For firmer skin, a minimum of 5 sessions is recommended.',
      },
      {
        name: 'Dry Cupping, Fire Cupping & Massage — Back & Legs',
        duration: '60 min', price: '70 €',
        image: imgCuppingDry,
        benefit: 'Deep relaxation, improved circulation',
        desc: 'A combination of dry cupping, fire cupping and massage for a deeply relaxing effect on the connective tissue and muscles of the back and legs.',
      },
      {
        name: 'Dry Cupping — Upper Body — Massage',
        duration: '45 min', price: '60 €',
        image: imgCuppingBoven,
        benefit: 'Detox, circulation, relaxation',
        desc: 'Chinese dry cupping technique using a vacuum pump on the upper body. The skin is drawn into the cup, stimulating circulation in the skin layers and muscles and flushing out waste products.',
      },
      {
        name: 'Wet Cupping (Hijama) — Massage — Dry Cupping',
        duration: '55 min', price: '60 €',
        image: imgHijama,
        benefit: 'Stress relief, energy, recovery',
        desc: 'Ideal for stress, tired muscles, a busy lifestyle or a need for rest. Works preventively, removes waste products and stimulates circulation for supple muscles.',
      },
      {
        name: 'Cupping Massage — Upper Body & Back, Fire Cupping',
        duration: '50 min', price: '55 €',
        image: imgCuppingBovenRug,
        benefit: 'Looser back, less tension',
        desc: 'Gliding cupping on the back and shoulders. Softens connective tissue, improves circulation and gives a feeling of space and freedom in the body.',
      },
      {
        name: 'Cupping for Children — Back, Massage',
        duration: '30 min', price: '35 €',
        image: imgCuppingKids,
        benefit: 'Gentle treatment for children',
        desc: 'Soft gliding cupping specially designed for children. Softens connective tissue and improves circulation in a safe and adapted way.',
      },
      {
        name: 'Back Dry Cupping',
        duration: '30 min', price: '35 €',
        image: imgRugcupping,
        benefit: 'Quick results, better circulation',
        desc: 'Targeted cupping massage on the upper body for a fast but effective improvement in circulation and connective tissue health.',
      },
      {
        name: 'Wet Cupping Without Massage',
        duration: '30 min', price: '35 €',
        image: imgWetCuppingNew,
        benefit: 'Detox, preventive care',
        desc: 'Hijama without massage. Works preventively, removes waste products and stimulates muscle circulation to keep them supple.',
      },
      {
        name: 'Cellulite Treatment / Magnesium Wrap',
        duration: '90 min', price: '90 €',
        image: imgMagnesium,
        benefit: 'Less oedema, firmer silhouette',
        desc: 'Cupping reduces fat and fluid accumulation, stimulates circulation and breaks down adhesions. Combined with a magnesium wrap for maximum results.',
      },
      {
        name: 'Brazilian Butt Lift + Back Cupping Massage',
        duration: '60 min', price: '80 €',
        image: imgRugcupping,
        benefit: 'Lifting, firmer silhouette, circulation',
        desc: 'Cupping massage targeting the buttocks and back for a visually lifting effect, improved circulation and a firmer silhouette. A popular treatment for contouring and skin improvement.',
      },
      {
        name: 'Massage, Dry Cupping, Fire Cupping, Wet Cupping & Heat Lamp',
        duration: '85 min', price: '85 €',
        image: imgVuurcuppingRug,
        benefit: 'Full detox, deep relaxation',
        desc: 'An extensive combination treatment with massage, dry cupping, fire cupping, wet cupping and heat lamp. Ideal for a complete detox, deep muscle relaxation and optimal circulation.',
      },
      {
        name: 'Lymphatic Drainage / Cupping / Massage',
        duration: 'Tailored', price: null,
        image: imgLymfedrainage,
        benefit: 'Detox, lymph stimulation, deep relaxation',
        desc: 'A combination of lymphatic drainage, cupping and massage for powerful detoxification, stimulation of the lymphatic system and deep relaxation of connective tissue and muscles.',
      },
    ],
  },

  gelaat: {
    label: 'Facial Treatments',
    subtitle: 'Advanced skin treatments for a radiant complexion',
    items: [
      {
        name: 'CoolLifting',
        duration: '60 min', price: null,
        image: imgCoollifting,
        isNew: true,
        benefit: 'Instant lifting, glow, no needles',
        desc: 'CoolLifting is a revolutionary treatment applying CO₂ at high pressure combined with a concentrated antioxidant serum. Immediate lifting, deep hydration and a radiant glow — no needles, no downtime.',
      },
      {
        name: 'Mesotherapy Toskani',
        duration: '60 min', price: null,
        image: imgMesotherapy,
        isNew: true,
        benefit: 'Cell renewal, vitamins, youthful skin',
        desc: 'Mesotherapy with professional Toskani cocktails for targeted delivery of vitamins, peptides and active ingredients. Stimulates cell renewal, reduces wrinkles and revitalises the skin.',
      },
      {
        name: 'Basic Facial Care',
        duration: '50 min', price: '55 €',
        image: imgBasisGelaat,
        benefit: 'Fresh appearance, clean skin',
        desc: 'Cleansing, skin scrubber, vapozone, extraction of impurities, mask, massage and day or night cream. The ideal basic treatment for a fresh and well-cared-for complexion.',
      },
      {
        name: 'Facial Care + Cupping',
        duration: '45 min', price: '55 €',
        image: imgClassicFacial,
        benefit: 'Radiant skin, improved circulation',
        desc: 'A complete facial care session enhanced with facial cupping for an extra stimulating and detoxifying effect on the skin.',
      },
      {
        name: 'Facial Massage',
        duration: '40 min', price: '50 €',
        image: imgClassicFacial,
        benefit: 'Better circulation, radiant skin',
        desc: 'A relaxing facial massage that improves circulation, stimulates the skin\'s natural healing ability and gives a fresher, more radiant complexion.',
      },
      {
        name: 'Dermaplaning',
        duration: '40 min', price: '45 €',
        image: imgDermaplaning,
        benefit: 'Soft, radiant and fresh skin',
        desc: 'Removes all dead skin cells and fine hairs using a sterile surgical blade. One of the most effective ways to exfoliate the skin and prevent clogged pores.',
      },
      {
        name: 'Dermaplaning with Massage',
        duration: '70 min', price: '65 €',
        image: imgDermaplaning,
        benefit: 'Exfoliation + relaxation',
        desc: 'An extended dermaplaning treatment combined with a relaxing facial massage for the ultimate result.',
      },
      {
        name: 'Dermaplaning + HydraFacial',
        duration: '90 min', price: '130 €',
        image: imgHydrafacial,
        benefit: 'Maximum exfoliation + hydration',
        desc: 'A powerful combination: dermaplaning for maximum exfoliation followed by a HydraFacial for deep hydration and glow.',
      },
      {
        name: 'Microdermabrasion',
        duration: '70 min', price: '65 €',
        image: imgMicrodermabrasie,
        benefit: 'Rejuvenation, smooth skin',
        desc: 'Intensive peeling with a device and aluminium oxide micro-crystals. Removes dead skin cells to the desired level. Multiple sessions deliver increasingly beautiful results.',
      },
      {
        name: 'Microdermabrasion + Collagen',
        duration: '90 min', price: '150 €',
        image: imgMicrodermabrasie,
        benefit: 'Firmer, smoother skin',
        desc: 'A combination of microdermabrasion and collagen treatment for intensive skin rejuvenation with deep hydration and firmness.',
      },
      {
        name: 'HydraFacial',
        duration: '80 min', price: '120 €',
        image: imgHydrafacial,
        benefit: 'Instant glowing results',
        desc: 'A non-invasive treatment with immediate results. Cleanses, exfoliates, removes impurities and hydrates with antioxidants, peptides and hyaluronic acid. 3 steps to a perfect glow.',
      },
      {
        name: 'HydraFacial Luxe (Bridal Edition)',
        duration: '100 min', price: '100 €',
        image: imgHydrafacialLuxe,
        benefit: 'Perfect skin for a special occasion',
        desc: 'The luxury version of HydraFacial. Specially crafted for brides or special occasions. An extensive treatment for the best skin of your life.',
      },
      {
        name: 'HydraFacial + Microneedling',
        duration: '90 min', price: '120 €',
        image: imgMicroneedling,
        benefit: 'Treated inside and out',
        desc: 'The ultimate combination: HydraFacial works from the outside in, microneedling stimulates collagen from the inside out. Ideal for acne, sun damage and premature ageing.',
      },
      {
        name: 'Microneedling',
        duration: '60 min', price: '70 €',
        image: imgMicroneedling,
        benefit: 'More collagen, firm, smooth',
        desc: 'A specialist pen creates tiny channels in the skin so active ingredients penetrate deeply. The skin heals with smooth collagen: firmer, more elastic, fewer fine lines and wrinkles.',
      },
      {
        name: 'Microneedling + Collagen',
        duration: '90 min', price: '170 €',
        image: imgCollageen,
        benefit: 'Lifting, youthful appearance',
        desc: 'An intense combination of microneedling and needleless collagen thread lifting. Increases elasticity, hydrates, improves volume and delivers a lifting effect. No needles, no downtime.',
      },
      {
        name: 'Collagen Treatment Per Zone',
        duration: '80 min', price: '90 €',
        image: imgCollageen,
        benefit: 'Lifting, firmness, youthful skin',
        desc: 'Needleless collagen thread lifting per zone. Increases elasticity, hydrates, improves density and pigmentation, adds volume and a lifting effect. No bruising, no downtime.',
      },
      {
        name: 'Facial Treatment with Collagen',
        duration: '110 min', price: '150 €',
        image: imgCollageen,
        benefit: 'Intensive, long-lasting results',
        desc: 'An extensive facial treatment combined with collagen therapy for a deep and long-lasting result.',
      },
      {
        name: 'Bio Peel',
        duration: '50 min', price: '65 €',
        image: imgBioPeel,
        benefit: 'Skin regeneration, fresh appearance',
        desc: 'Herbal peeling with herbs, seaweed and algae. Triggers skin regeneration from within. Dead skin cells are removed and the skin\'s natural healing ability is immediately activated.',
      },
      {
        name: 'Teen Facial (Bio Peel)',
        duration: '45 min', price: '50 €',
        image: imgTiener,
        benefit: 'Clear, fresh skin for young people',
        desc: 'Specially formulated for girls up to age 15. Effectively targets acne and blemishes by removing dead skin cells and excess sebum. Safe and adapted for young skin.',
      },
      {
        name: 'BioPulse Therapy',
        duration: '75 min', price: '89.50 €',
        image: imgBioPulse,
        benefit: 'Oxygen, collagen, recovery',
        desc: 'Intensive biochemical skin restoration. Improves blood circulation, oxygen levels and lymphatic drainage. Peptides, vitamin C and pulsed oxygen stimulate collagen and elastin production.',
      },
      {
        name: 'Comedone / Milia Extraction',
        duration: '10 min', price: '15 €',
        image: imgMilia,
        benefit: 'Purified skin',
        desc: 'A targeted treatment for the removal of blackheads (comedones) or milia. Quick and effective.',
      },
      {
        name: 'Vapozone + Comedone Extraction',
        duration: '15 min', price: '20 €',
        image: imgVapozone,
        benefit: 'Pore reduction, purified skin',
        desc: 'Vapozone treatment followed by comedone extraction for a deeply cleansed, minimised-pore complexion.',
      },
    ],
  },

  massage: {
    label: 'Massage',
    subtitle: 'Relaxation from head to toe',
    items: [
      {
        name: 'Holistic Massage',
        duration: '45 min', price: '40 €',
        image: imgHolistische,
        benefit: 'Total relaxation, energy renewal',
        desc: 'A relaxing massage that approaches the whole body as one, targeting deep relaxation of body and mind.',
      },
      {
        name: 'Hot Stone — Full Body',
        duration: '70 min', price: '70 €',
        image: imgHotStone,
        benefit: 'Deep warmth, stress relief, energy',
        desc: 'Heated basalt stones are placed on key points. The warmth penetrates deep into the muscles, stimulates blood and lymph circulation and releases blocked energy.',
      },
      {
        name: 'Hot Stone — Back',
        duration: '40 min', price: '40 €',
        image: imgHotStone,
        benefit: 'Warm back, relaxed shoulders',
        desc: 'A targeted hot stone massage on the back and shoulders for deep muscle relaxation and heat therapy.',
      },
      {
        name: 'Hot Stone — Back & Lower Legs',
        duration: '40 min', price: '55 €',
        image: imgHotStone,
        benefit: 'Lighter legs, warm back',
        desc: 'A combination hot stone treatment for the back and lower legs. Improves circulation and relieves tension in the lower half of the body.',
      },
      {
        name: 'Moxa Herbal Massage — Back',
        duration: '30 min', price: '35 €',
        image: imgMoxa,
        benefit: 'Heat therapy, energy flow',
        desc: 'Traditional Chinese moxa therapy with mugwort herb. A warming treatment that penetrates deeply and stimulates energy flow. Can also be used for breech presentation.',
      },
      {
        name: 'Moxa Herbal Massage — Back & Lower Legs',
        duration: '40 min', price: '45 €',
        image: imgMoxa,
        benefit: 'Warmth, recovery, energy',
        desc: 'An extended moxa treatment for both the back and lower legs. Deep warming effect for complete recovery.',
      },
      {
        name: 'Ear Candle Treatment',
        duration: '30 min', price: '35 €',
        image: imgOorkaars,
        benefit: 'Rest, relaxation, ear & head relief',
        desc: 'A deeply calming treatment with ear reflex massage, lymph massage of the neck and head massage. Helpful for migraines, stress, tinnitus, sinuses and sleep problems.',
      },
      {
        name: 'Foot Reflexology',
        duration: '30 min', price: '35 €',
        image: imgVoetreflexo,
        benefit: 'Balance, refreshment',
        desc: 'Targeted foot reflexology activating pressure points on the feet that correspond to organs and body systems.',
      },
      {
        name: 'Foot Reflexology (Extended)',
        duration: '60 min', price: '60 €',
        image: imgVoetreflexo,
        benefit: 'Deep balance, relaxation',
        desc: 'An extended foot reflexology session for a profound effect on the entire body through the reflex zones in the feet.',
      },
      {
        name: 'Pregnancy Massage',
        duration: '60 min', price: '65 €',
        image: imgZwangerschap,
        benefit: 'Rest for mother & baby',
        desc: 'Specially developed for pregnant women (from 14 weeks). Gentle strokes on the back, legs, feet, arms and head. Beneficial for both mother and baby. For healthy pregnancies only.',
      },
      {
        name: 'Complete Body Massage',
        duration: '85 min', price: '55 €',
        image: imgOntspanning,
        benefit: 'Full recovery, deep relaxation',
        desc: 'An extensive full-body massage using various techniques: effleurage, pressure and kneading. Adaptable to light or firm pressure according to your preference.',
      },
      {
        name: 'Relaxation Massage — Full Body',
        duration: '70 min', price: '65 €',
        image: imgOntspanning,
        benefit: 'Stress-free, better sleep, energy',
        desc: 'A calming massage drawing on all massage techniques. Reduces stress, improves circulation, strengthens immunity, improves sleep and restores energy.',
      },
      {
        name: 'Relaxation Massage — Back & Lower Legs',
        duration: '45 min', price: '55 €',
        image: imgOntspanning,
        benefit: 'Looser back, free legs',
        desc: 'A targeted relaxation massage on the back and lower legs for a quick but deeply effective release of tension.',
      },
      {
        name: 'Relaxation Massage — Back, Neck & Shoulders',
        duration: '30 min', price: '35 €',
        image: imgOntspanning,
        benefit: 'Free neck, relaxed shoulders',
        desc: 'Classic massage of the back, neck and shoulders with effleurage, pressure and kneading. Tailored to your preferences.',
      },
      {
        name: 'Shoulders, Neck & Back',
        duration: '25 min', price: '30 €',
        image: imgMassageHeader,
        benefit: 'Quick relief, immediate results',
        desc: 'A quick but targeted massage for the upper back, neck and shoulders. Perfect for acute tension or as a quick treat-yourself moment.',
      },
      {
        name: 'Relaxation Massage + Cupping',
        duration: '90 min', price: '85 €',
        image: imgOntspanning,
        benefit: 'Double effect, deepest relaxation',
        desc: 'The power of relaxation massage combined with cupping for a double effect on circulation, relaxation and tissue cleansing.',
      },
      {
        name: 'Maderotherapy — Legs & Buttocks',
        duration: '50 min', price: '65 €',
        image: imgMaderotherapy,
        benefit: 'Firmer silhouette, lymph stimulation',
        desc: 'A treatment using wooden instruments for deep lymphatic drainage and a cellulite-reducing effect on the legs and buttocks.',
      },
      {
        name: 'Maderotherapy — Abdomen',
        duration: '35 min', price: '45 €',
        image: imgMaderotherapy,
        benefit: 'Flatter abdomen, better circulation',
        desc: 'A targeted maderotherapy treatment on the abdominal area for an improved silhouette and stimulation of lymphatic drainage.',
      },
      {
        name: 'Maderotherapy — Arms',
        duration: '35 min', price: '40 €',
        image: imgMaderotherapy,
        benefit: 'Firmer arms',
        desc: 'Maderotherapy on the arms for firmer tissue and an improved appearance.',
      },
      {
        name: 'Maderotherapy — Back',
        duration: '30 min', price: '35 €',
        image: imgMaderotherapy,
        benefit: 'Looser back, circulation',
        desc: 'Targeted maderotherapy on the back for improved circulation and tissue relaxation.',
      },
      {
        name: 'Magnesium Wrap',
        duration: '50 min', price: '60 €',
        image: imgMagnesium,
        benefit: 'Muscle recovery, relaxation, energy',
        desc: 'Magnesium promotes blood circulation, accelerates metabolism and stimulates muscle firmness. Essential for muscle cramps, stress, burnout, sleep problems and fibromyalgia.',
      },
      {
        name: 'Duo Massage',
        duration: '60 min', price: '120 €',
        image: imgDuoMassage,
        benefit: 'Relax together',
        desc: 'Enjoy a relaxing massage together. The ideal romantic gift or indulgent moment for two. By appointment.',
      },
      {
        name: 'Duo Massage (Extended)',
        duration: '90 min', price: '170 €',
        image: imgDuoMassage,
        benefit: 'Ultimate duo experience',
        desc: 'An extended duo massage session for deeply relaxing both of you. By appointment.',
      },
      {
        name: 'Uterine Massage',
        duration: '60 min', price: '55 €',
        image: imgBaarmoeder,
        benefit: 'Feminine wellbeing, warmth',
        desc: 'Treatment using a moxa heat lamp on the abdominal area, massage with warm castor oil and cupping on the ovarian and uterine pressure points.',
      },
    ],
  },

  peeling: {
    label: 'Peeling',
    subtitle: 'Professional skin renewal and cell regeneration',
    items: [
      {
        name: 'Peeling',
        duration: 'Tailored', price: 'From 65 €',
        image: imgPeeling,
        benefit: 'Skin renewal, refined texture',
        desc: 'A professional peeling treatment for healthy skin. Removes dead skin cells, stimulates cell renewal and visibly improves skin texture.',
      },
      {
        name: 'Radiance Peel',
        duration: 'Tailored', price: '100 €',
        image: imgRadiancePeel,
        benefit: 'Radiant skin, even tone',
        desc: 'An intensive brightening peel for a luminous, even complexion. Reduces pigmentation, refines skin texture and delivers an immediate glowing result.',
      },
      {
        name: 'Photo-Aging Peel',
        duration: 'Tailored', price: '85 €',
        image: imgPhotoAgingPeel,
        benefit: 'Anti-ageing, less pigment, youthful',
        desc: 'A targeted anti-ageing peel for sun-damaged skin. Stimulates collagen production, reduces pigmentation and fine lines for a more youthful appearance.',
      },
    ],
  },

  huidscan: {
    label: 'Skin Analysis',
    subtitle: 'Professional skin assessment as a foundation for targeted care',
    items: [
      {
        name: 'Skin Analysis',
        duration: 'Tailored', price: '50 €',
        image: imgHuidscan,
        benefit: 'Personalised skin advice, insight',
        desc: 'A professional skin analysis as the starting point for a targeted skincare routine. Using advanced scanning technology, you gain insight into your skin type, pores, hydration levels, wrinkles and pigmentation.',
      },
    ],
  },

  plasma: {
    label: 'Plasma Lifting',
    subtitle: 'Non-invasive skin tightening and wrinkle reduction',
    items: [
      {
        name: 'Plasma Lift — Eyes (Upper / Lower)',
        duration: 'Tailored', price: '175 €',
        image: imgPlasmaOgen,
        benefit: 'Lifting, wrinkle reduction, eyes',
        desc: 'A non-invasive plasma lift treatment for the eye contours. Firms the eyelid, reduces wrinkles and delivers a visibly lifting effect without surgery.',
      },
      {
        name: 'Plasma Lift — Forehead',
        duration: 'Tailored', price: '175 €',
        image: imgPlasma2,
        benefit: 'Smooth skin, fewer wrinkles',
        desc: 'Plasma lift on the forehead for a visible reduction in wrinkles and fine lines. Stimulates collagen production for firmer, more youthful skin.',
      },
      {
        name: 'Plasma Lift — Neck',
        duration: 'Tailored', price: '200 €',
        image: imgPlasma2,
        benefit: 'Lifted neck, firmer skin',
        desc: 'A plasma lift treatment for the neck for a firming and lifting effect. Improves skin quality and reduces sagging of the neck skin.',
      },
      {
        name: 'Plasma Lift — Nasolabial Folds',
        duration: 'Tailored', price: '100 €',
        image: imgPlasma2,
        benefit: 'Softer lines, fresher mouth area',
        desc: 'Targeted plasma lift on the nasolabial folds for a visible reduction of the deep lines around the mouth.',
      },
      {
        name: 'Plasma Lift — Pigmentation',
        duration: 'Tailored', price: 'From 30 €',
        image: imgPlasma2,
        benefit: 'Even tone, less pigment',
        desc: 'A non-invasive plasma lift treatment for the targeted removal of pigmentation spots and unwanted skin discolouration.',
      },
      {
        name: 'Plasma Lift — Skin Tag Removal',
        duration: 'Tailored', price: '30 €',
        image: imgPlasma2,
        benefit: 'Clean skin, fast results',
        desc: 'Safe and effective removal of skin tags (small skin growths) using plasma lift technology. Quick, precise and with minimal recovery time.',
      },
      {
        name: 'Plasma Lift — Frown Lines',
        duration: 'Tailored', price: '50 €',
        image: imgPlasma2,
        benefit: 'Relaxed look, fewer frown lines',
        desc: 'Plasma lift on the frown and brow area for a relaxed, youthful appearance. Visibly reduces deep frown and brow wrinkles.',
      },
    ],
  },
}

const categoryKeys = ['fysiotherapie', 'cupping', 'gelaat', 'massage', 'peeling', 'huidscan', 'plasma']

function PinkPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #F9E8F3 0%, #F4D6EC 50%, #EDD8E8 100%)' }}>
      <span style={{ color: '#D4A8C7', fontSize: 36, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>✦</span>
    </div>
  )
}

function TreatmentCard({ item }) {
  const [expanded, setExpanded] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-card flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden bg-[#F9E8F3] flex-shrink-0">
        {item.image && !imgError ? (
          <img src={item.image} alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgError(true)} loading="lazy" />
        ) : (
          <PinkPlaceholder />
        )}

        {item.isNew && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #A41162, #953D7F)' }}>
              <Sparkles size={10} /> New
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-brand-primary shadow-soft">
            {item.benefit}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start gap-2">
          <h3 className="font-serif text-xl text-text-dark leading-snug flex-1">{item.name}</h3>
        </div>

        {item.duration && (
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock size={12} />
            {item.duration}
          </div>
        )}

        <p className={`text-sm text-text-muted font-light leading-relaxed transition-all duration-300 ${expanded ? '' : 'line-clamp-2'}`}>
          {item.desc}
        </p>

        <div className="flex items-center justify-between gap-3 pt-1 mt-auto">
          <button onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-brand-primary transition-colors">
            {expanded ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> Read more</>}
          </button>
          <Link to="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            style={{ background: 'linear-gradient(135deg, #A41162, #953D7F)' }}>
            <CalendarCheck size={12} /> Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-5 px-6 rounded-3xl my-10"
      style={{ background: 'linear-gradient(135deg, #F9E8F3 0%, #EDD8E8 100%)', border: '1px solid rgba(212,168,199,0.3)' }}>
      <div className="flex gap-0.5">
        {Array(5).fill(0).map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
      </div>
      <p className="text-sm text-text-muted">
        <span className="font-medium text-text-dark">66 Google reviews, 5.0 stars</span>
        {' '}· Loved by clients in Dubai Marina
      </p>
      <Link to="/contact"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-primary hover:underline">
        Book an appointment <ArrowRight size={12} />
      </Link>
    </div>
  )
}

export default function Treatments() {
  const [searchParams] = useSearchParams()
  const paramCat = searchParams.get('categorie')
  const [activeCategory, setActiveCategory] = useState(
    paramCat && categoryKeys.includes(paramCat) ? paramCat : 'fysiotherapie'
  )
  const current = treatments[activeCategory]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1A0525 0%, #4A0E40 45%, #A41162 80%, #953D7F 100%)' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 100% 0%, rgba(241,98,237,0.15) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 0% 100%, rgba(149,61,127,0.25) 0%, transparent 65%)' }} />
        <div className="container-narrow relative z-10 text-center">
          <SectionReveal>
            <div className="section-label justify-center" style={{ color: 'rgba(251,229,250,0.70)' }}>
              <span className="w-6 h-px bg-white/40 inline-block" />
              Professional treatments
            </div>
            <h1 className="heading-lg mb-5 text-white text-balance">
              Our <em className="not-italic" style={{ color: '#F4A8DA' }}>treatments</em>
            </h1>
            <p className="text-lg text-white/70 font-light max-w-lg mx-auto mb-8 leading-relaxed">
              From cupping and massage to advanced facial care and plasma lifting. Every treatment is personalised and tailored to you.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-primary font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <CalendarCheck size={15} /> Book an Appointment
              </Link>
              <a href="tel:+97144507788"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/15 border border-white/30 text-white font-medium text-sm transition-all duration-300 hover:bg-white/25">
                <Phone size={15} /> Call for advice
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Sticky category tabs */}
      <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-sm border-b border-[#EDD8E8]/60 shadow-soft">
        <div className="container-wide">
          <div className="flex gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: 'none' }}>
            {categoryKeys.map((key) => (
              <button key={key} onClick={() => setActiveCategory(key)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === key
                    ? 'text-white shadow-soft'
                    : 'text-text-muted hover:text-text-dark hover:bg-[#F9E8F3]/60'
                }`}
                style={activeCategory === key ? { background: 'linear-gradient(135deg, #A41162, #953D7F)' } : {}}>
                {treatments[key].label}
                {key === 'gelaat' && (
                  <span className="ml-1.5 text-[10px] font-semibold opacity-70">new</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Treatments grid */}
      <section className="section-padding" style={{ background: '#FAF7F5' }}>
        <div className="container-wide">
          <SectionReveal>
            <div className="mb-10">
              <h2 className="heading-sm mb-1">{current.label}</h2>
              <p className="text-sm text-text-muted">{current.subtitle}</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {current.items.map((item, i) => (
              <SectionReveal key={item.name} delay={i * 30}>
                <TreatmentCard item={item} />
              </SectionReveal>
            ))}
          </div>

          <TrustStrip />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionReveal>
            <div className="rounded-3xl p-8 md:p-10 text-center"
              style={{ background: 'linear-gradient(135deg, #F9E8F3 0%, #EDD8E8 100%)', border: '1px solid rgba(212,168,199,0.3)' }}>
              <h2 className="font-serif text-3xl text-text-dark mb-3">Not sure which treatment is right for you?</h2>
              <p className="text-text-muted font-light max-w-md mx-auto mb-7">
                Feel free to get in touch. Our team will be happy to help you find the perfect treatment based on your needs and wishes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="tel:+97144507788" className="btn-primary">
                  <Phone size={15} /> +971 4 450 7788
                </a>
                <a href="mailto:hello@aurawellness.ae" className="btn-secondary">
                  Send a message
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
