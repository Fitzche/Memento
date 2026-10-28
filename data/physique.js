// Physique : formules principales (lycée, spécialité physique-chimie).
// Champs : loi / grandeur | formule | unités et remarques
MEMENTO.add('physique', String.raw`
# Cinématique
> Position, vitesse, accélération, mouvements usuels.
Vecteur vitesse | $\vec v=\dfrac{d\overrightarrow{OM}}{dt}$ | En m·s⁻¹. Tangent à la trajectoire.
Vecteur accélération | $\vec a=\dfrac{d\vec v}{dt}=\dfrac{d^2\overrightarrow{OM}}{dt^2}$ | En m·s⁻².
Vitesse moyenne | $v=\dfrac{d}{\Delta t}$ | $d$ en m, $\Delta t$ en s. 1 m·s⁻¹ = 3,6 km·h⁻¹.
Mouvement rectiligne uniforme | $x(t)=v\,t+x_0$ et $\vec a=\vec 0$ | Vitesse constante en norme et direction.
Mouvement uniformément accéléré | $v(t)=at+v_0$ et $x(t)=\tfrac12at^2+v_0t+x_0$ | Relation utile sans le temps : $v^2-v_0^2=2a(x-x_0)$.
Mouvement circulaire uniforme | $a=\dfrac{v^2}{R}$, accélération centripète dirigée vers le centre | $v=R\omega$ avec $\omega$ en rad·s⁻¹ ; période $T=\dfrac{2\pi R}{v}$.
Repère de Frenet | $\vec a=\dfrac{dv}{dt}\vec u_T+\dfrac{v^2}{R}\vec u_N$ | Composante tangentielle (variation de vitesse) et normale (courbure).
Vitesse angulaire | $\omega=\dfrac{2\pi}{T}=2\pi f$ | $\omega$ en rad·s⁻¹, $T$ en s, $f$ en Hz.

# Dynamique (lois de Newton)
> Forces, quantité de mouvement, lois de Newton.
Quantité de mouvement | $\vec p=m\vec v$ | En kg·m·s⁻¹.
Première loi de Newton (principe d'inertie) | Dans un référentiel galiléen, si $\sum\vec F=\vec 0$, alors $\vec v$ est constant (et réciproquement). | Le système est immobile ou en mouvement rectiligne uniforme.
Deuxième loi de Newton | $\sum\vec F_{\text{ext}}=\dfrac{d\vec p}{dt}=m\vec a$ (si $m$ constante) | Dans un référentiel galiléen. Forces en N.
Troisième loi de Newton (actions réciproques) | $\vec F_{A/B}=-\vec F_{B/A}$ | Mêmes droite d'action, même valeur, sens opposés.
Poids | $\vec P=m\vec g$, $P=mg$ | $g\approx9{,}81$ N·kg⁻¹ à la surface de la Terre.
Conservation de la quantité de mouvement | Système isolé (ou pseudo-isolé) : $\vec p_{\text{avant}}=\vec p_{\text{après}}$ | Explique la propulsion par réaction (fusée) et le recul.
Poussée d'Archimède | $\Pi=\rho_{\text{fluide}}\,V_{\text{immergé}}\,g$ | Force verticale vers le haut. $\rho$ en kg·m⁻³, $V$ en m³.
Force de frottement fluide | $f=kv$ (faible vitesse) ou $f=kv^2$ (grande vitesse) | Opposée à la vitesse ; conduit à une vitesse limite.
Force de rappel d'un ressort | $F=k\,\lvert\Delta\ell\rvert$ | $k$ raideur en N·m⁻¹, $\Delta\ell$ allongement en m (loi de Hooke).
Tension d'un fil et réaction d'un support | Forces de contact : $\vec T$ dirigée le long du fil, $\vec R$ perpendiculaire au support (sans frottement). | Les forces de contact s'appliquent au point de contact.

# Gravitation et mouvements dans un champ
> Champ uniforme, satellites, lois de Kepler.
Loi de la gravitation universelle | $F=G\dfrac{m_Am_B}{d^2}$ | $G=6{,}67\times10^{-11}$ N·m²·kg⁻², $d$ en m. Force attractive.
Champ de gravitation | $g=G\dfrac{M}{d^2}$ | Créé par un astre de masse $M$ à la distance $d$ de son centre.
Chute libre dans un champ uniforme | $\vec a=\vec g$ ; $x(t)=v_0\cos\alpha\,t$ et $z(t)=-\tfrac12gt^2+v_0\sin\alpha\,t$ | Trajectoire parabolique ; indépendante de la masse.
Équation de la trajectoire parabolique | $z=-\dfrac{g}{2v_0^2\cos^2\alpha}x^2+x\tan\alpha$ | Portée maximale pour $\alpha=45°$ (sur sol horizontal).
Vitesse d'un satellite en orbite circulaire | $v=\sqrt{\dfrac{GM}{r}}$ | $r=R+h$ distance au centre de l'astre. Mouvement circulaire uniforme.
Période de révolution | $T=2\pi\sqrt{\dfrac{r^3}{GM}}$ | Satellite géostationnaire : $T\approx24$ h, altitude ≈ 36 000 km.
Première loi de Kepler | Les planètes décrivent des ellipses dont le Soleil occupe un foyer. | Loi des orbites.
Deuxième loi de Kepler | Le segment Soleil–planète balaie des aires égales pendant des durées égales. | Loi des aires : la planète va plus vite près du Soleil.
Troisième loi de Kepler | $\dfrac{T^2}{a^3}=\dfrac{4\pi^2}{GM}$ = constante | $a$ demi-grand axe. Même constante pour toutes les planètes d'un même astre.
Champ électrique uniforme (condensateur plan) | $E=\dfrac{U}{d}$ et $\vec F=q\vec E$ | $E$ en V·m⁻¹, $U$ en V, $d$ en m. Accélérateur de particules.

# Énergie et travail
> Travail d'une force, énergies, conservation.
Travail d'une force constante | $W_{AB}(\vec F)=\vec F\cdot\overrightarrow{AB}=F\cdot AB\cos\alpha$ | En J. Moteur si $W>0$, résistant si $W<0$.
Travail du poids | $W_{AB}(\vec P)=mg(z_A-z_B)$ | Ne dépend pas du chemin suivi : le poids est conservatif.
Énergie cinétique | $E_c=\tfrac12mv^2$ | En J, $m$ en kg, $v$ en m·s⁻¹.
Théorème de l'énergie cinétique | $\Delta E_c=E_c(B)-E_c(A)=\sum W_{AB}(\vec F)$ | Dans un référentiel galiléen.
Énergie potentielle de pesanteur | $E_{pp}=mgz$ | $z$ altitude, axe vertical orienté vers le haut.
Énergie mécanique | $E_m=E_c+E_p$ | Conservée en l'absence de forces non conservatives (frottements).
Variation de l'énergie mécanique | $\Delta E_m=\sum W(\vec F_{\text{non conservatives}})$ | Les frottements font diminuer $E_m$ (dissipation thermique).
Énergie potentielle élastique | $E_{pe}=\tfrac12kx^2$ | $x$ allongement du ressort.
Puissance | $P=\dfrac{E}{\Delta t}$ ou $P=\vec F\cdot\vec v$ | En W (J·s⁻¹). 1 kWh = 3,6 × 10⁶ J.
Rendement | $\eta=\dfrac{E_{\text{utile}}}{E_{\text{reçue}}}=\dfrac{P_{\text{utile}}}{P_{\text{reçue}}}$ | Sans unité, toujours inférieur à 1.

# Ondes
> Ondes mécaniques, sonores et lumineuses, diffraction, interférences, Doppler.
Célérité d'une onde | $v=\dfrac{d}{\Delta t}$ | Retard $\tau=\dfrac dv$. Son dans l'air ≈ 340 m·s⁻¹.
Relation longueur d'onde – période | $\lambda=vT=\dfrac{v}{f}$ | $\lambda$ en m, $T$ en s, $f$ en Hz.
Onde progressive sinusoïdale | $y(x,t)=A\cos\left(2\pi\left(\dfrac tT-\dfrac x\lambda\right)\right)$ | Double périodicité : temporelle ($T$) et spatiale ($\lambda$).
Intensité et niveau sonores | $L=10\log\left(\dfrac{I}{I_0}\right)$ | $L$ en dB, $I$ en W·m⁻², $I_0=10^{-12}$ W·m⁻² (seuil d'audibilité).
Atténuation géométrique | $I=\dfrac{P}{4\pi d^2}$ | Pour une source ponctuelle qui émet dans toutes les directions.
Diffraction | $\theta=\dfrac{\lambda}{a}$ | $\theta$ demi-écart angulaire (rad), $a$ taille de l'ouverture. Importante si $a$ est de l'ordre de $\lambda$.
Largeur de la tache centrale de diffraction | $L=\dfrac{2\lambda D}{a}$ | $D$ distance fente–écran (approximation des petits angles).
Interférences : conditions | Constructives si $\delta=k\lambda$ ; destructives si $\delta=\left(k+\tfrac12\right)\lambda$ | $\delta$ différence de marche, $k$ entier. Sources cohérentes nécessaires.
Interfrange (fentes d'Young) | $i=\dfrac{\lambda D}{b}$ | $b$ distance entre les fentes, $D$ distance à l'écran.
Effet Doppler | $f_R=f_E\dfrac{v}{v-v_S}$ (source qui se rapproche) ; décalage $\dfrac{\Delta f}{f}\approx\dfrac{v_S}{v}$ | La fréquence perçue augmente si la source se rapproche. Radar, astrophysique.
Indice de réfraction | $n=\dfrac{c}{v}$ | $c=3{,}00\times10^8$ m·s⁻¹ ; $n\geq1$.
Lois de Snell-Descartes | Réflexion : $i_1=r$. Réfraction : $n_1\sin i_1=n_2\sin i_2$ | Angles mesurés par rapport à la normale.
Réflexion totale | Si $n_1>n_2$, réflexion totale quand $\sin i_1>\dfrac{n_2}{n_1}$ | Principe de la fibre optique.

# Optique géométrique
> Lentilles minces, grandissement, lunette astronomique.
Relation de conjugaison | $\dfrac{1}{\overline{OA'}}-\dfrac{1}{\overline{OA}}=\dfrac{1}{\overline{OF'}}$ | Distances algébriques en m.
Vergence | $C=\dfrac{1}{f'}$ | $C$ en dioptries (δ), $f'$ en m. $C>0$ : lentille convergente.
Grandissement | $\gamma=\dfrac{\overline{A'B'}}{\overline{AB}}=\dfrac{\overline{OA'}}{\overline{OA}}$ | $\gamma<0$ : image renversée ; $\lvert\gamma\rvert>1$ : image agrandie.
Grossissement d'une lunette afocale | $G=\dfrac{\theta'}{\theta}=\dfrac{f'_1}{f'_2}$ | $f'_1$ objectif, $f'_2$ oculaire. Lunette afocale : $F'_1=F_2$.

# Électricité
> Lois des circuits, condensateur, circuit RC.
Intensité du courant | $i=\dfrac{dq}{dt}$, et $I=\dfrac{Q}{\Delta t}$ en régime continu | En A, charge en C.
Loi d'Ohm | $U=RI$ | $U$ en V, $R$ en Ω, $I$ en A.
Loi des nœuds | La somme des intensités entrant dans un nœud est égale à la somme des intensités qui en sortent. | Conservation de la charge.
Loi des mailles | La somme algébrique des tensions le long d'une maille est nulle.
Puissance électrique | $P=UI$ ; pour un conducteur ohmique $P=RI^2=\dfrac{U^2}{R}$ | En W. Effet Joule.
Énergie électrique | $E=P\,\Delta t=UI\,\Delta t$ | En J (ou kWh).
Association de résistances | Série : $R=R_1+R_2$. Dérivation : $\dfrac1R=\dfrac1{R_1}+\dfrac1{R_2}$
Condensateur | $q=Cu$ et $i=C\dfrac{du}{dt}$ | $C$ capacité en F. Condensateur plan : $C=\dfrac{\varepsilon S}{d}$.
Énergie stockée dans un condensateur | $E=\tfrac12Cu^2$ | En J.
Constante de temps d'un circuit RC | $\tau=RC$ | En s. À $t=\tau$, la charge atteint 63 % ; à $5\tau$, plus de 99 %.
Charge d'un condensateur (RC) | $u_C(t)=E\left(1-e^{-t/\tau}\right)$ | Solution de $RC\dfrac{du_C}{dt}+u_C=E$.
Décharge d'un condensateur (RC) | $u_C(t)=E\,e^{-t/\tau}$ | Solution de $RC\dfrac{du_C}{dt}+u_C=0$.
Loi de Coulomb | $F=k\dfrac{\lvert q_Aq_B\rvert}{d^2}$ | $k=\dfrac1{4\pi\varepsilon_0}\approx9{,}0\times10^9$ N·m²·C⁻².
Champ électrique d'une charge ponctuelle | $E=k\dfrac{\lvert q\rvert}{d^2}$ et $\vec F=q\vec E$ | $E$ en N·C⁻¹ (= V·m⁻¹).

# Thermodynamique
> Énergie interne, transferts thermiques, gaz parfait, rayonnement.
Premier principe de la thermodynamique | $\Delta U=W+Q$ | Variation d'énergie interne = travail + transfert thermique reçus (en J).
Variation d'énergie interne d'un solide ou liquide | $\Delta U=mc\,\Delta T$ | $c$ capacité thermique massique en J·kg⁻¹·K⁻¹ ; eau : $c\approx4180$ J·kg⁻¹·K⁻¹.
Changement d'état | $Q=mL$ | $L$ chaleur latente massique en J·kg⁻¹.
Loi des gaz parfaits | $PV=nRT$ | $P$ en Pa, $V$ en m³, $T$ en K, $R=8{,}314$ J·mol⁻¹·K⁻¹.
Température absolue | $T(\text{K})=\theta(°\text{C})+273{,}15$ | Le zéro absolu vaut 0 K.
Pression | $P=\dfrac{F}{S}$ | En Pa (N·m⁻²). 1 bar = 10⁵ Pa ; pression atmosphérique ≈ 1 013 hPa.
Loi fondamentale de la statique des fluides | $P_B-P_A=\rho g(z_A-z_B)$ | La pression augmente avec la profondeur : environ +1 bar tous les 10 m dans l'eau.
Flux thermique | $\Phi=\dfrac{Q}{\Delta t}$ | En W.
Résistance thermique | $\Phi=\dfrac{T_1-T_2}{R_{th}}$ et $R_{th}=\dfrac{e}{\lambda S}$ | $e$ épaisseur, $\lambda$ conductivité thermique (W·m⁻¹·K⁻¹).
Loi de Newton (refroidissement) | $\Phi=hS\,(T-T_{\text{ext}})$ et $T(t)=T_{\text{ext}}+(T_0-T_{\text{ext}})e^{-t/\tau}$ | Transfert conducto-convectif ; décroissance exponentielle.
Loi de Wien | $\lambda_{\max}\,T=2{,}90\times10^{-3}$ m·K | Plus un corps est chaud, plus il émet à courte longueur d'onde.
Loi de Stefan-Boltzmann | $P=\sigma ST^4$ | $\sigma=5{,}67\times10^{-8}$ W·m⁻²·K⁻⁴. Puissance rayonnée par un corps noir.

# Fluides en mouvement
> Débit, Bernoulli.
Débit volumique | $D_V=\dfrac{V}{\Delta t}=v\,S$ | En m³·s⁻¹.
Conservation du débit | $v_1S_1=v_2S_2$ | Fluide incompressible : la vitesse augmente quand la section diminue.
Relation de Bernoulli | $P+\tfrac12\rho v^2+\rho gz=$ constante | Fluide parfait, incompressible, écoulement permanent. Effet Venturi.

# Physique moderne
> Photon, effet photoélectrique, dualité onde-particule, relativité.
Énergie d'un photon | $E=h\nu=\dfrac{hc}{\lambda}$ | $h=6{,}63\times10^{-34}$ J·s ; 1 eV = 1,60 × 10⁻¹⁹ J.
Effet photoélectrique | $E_c=h\nu-W_{\text{extraction}}$ | Il faut $h\nu>W$ : explique la nature corpusculaire de la lumière (Einstein, 1905).
Relation de de Broglie | $\lambda=\dfrac{h}{p}=\dfrac{h}{mv}$ | Toute particule a un comportement ondulatoire (dualité onde-particule).
Transition énergétique d'un atome | $\Delta E=E_{\text{haut}}-E_{\text{bas}}=h\nu$ | Les niveaux d'énergie de l'atome sont quantifiés ; spectres de raies.
Équivalence masse-énergie | $E=mc^2$ | Énergie libérée lors d'une réaction nucléaire : $E=\lvert\Delta m\rvert c^2$.
Dilatation des durées | $\Delta t'=\gamma\,\Delta t_0$ avec $\gamma=\dfrac1{\sqrt{1-v^2/c^2}}$ | $\Delta t_0$ durée propre. Relativité restreinte.
Rendement d'une cellule photovoltaïque | $\eta=\dfrac{P_{\text{électrique}}}{P_{\text{lumineuse}}}$ et $P=UI$ au point de fonctionnement | Puissance maximale au « coude » de la caractéristique.

# Radioactivité
> Désintégrations, décroissance, demi-vie.
Lois de conservation (Soddy) | Lors d'une réaction nucléaire, le nombre de nucléons $A$ et le nombre de charge $Z$ se conservent. | Radioactivité α : émission de $^4_2\text{He}$ ; β⁻ : $^{\ 0}_{-1}e$ ; β⁺ : $^0_1e$.
Loi de décroissance radioactive | $N(t)=N_0\,e^{-\lambda t}$ | $\lambda$ constante radioactive en s⁻¹. Solution de $\dfrac{dN}{dt}=-\lambda N$.
Activité | $A=\lambda N=-\dfrac{dN}{dt}$ | En becquerels (Bq) = désintégrations par seconde.
Demi-vie | $t_{1/2}=\dfrac{\ln2}{\lambda}$ | Au bout de $n$ demi-vies, il reste $\dfrac{N_0}{2^n}$ noyaux.
Énergie de liaison | $E_\ell=\Delta m\,c^2$ avec $\Delta m=Zm_p+(A-Z)m_n-m_{\text{noyau}}$ | L'énergie de liaison par nucléon est maximale vers le fer : fusion des noyaux légers, fission des lourds.

# Constantes et ordres de grandeur
> Valeurs à connaître.
Vitesse de la lumière dans le vide | $c=3{,}00\times10^8$ m·s⁻¹ | Valeur exacte : 299 792 458 m·s⁻¹.
Constante de Planck | $h=6{,}63\times10^{-34}$ J·s
Charge élémentaire | $e=1{,}60\times10^{-19}$ C | Charge du proton ; celle de l'électron vaut $-e$.
Constante de gravitation universelle | $G=6{,}67\times10^{-11}$ N·m²·kg⁻²
Nombre d'Avogadro | $N_A=6{,}02\times10^{23}$ mol⁻¹ | Lien quantité de matière : $n=\dfrac{N}{N_A}=\dfrac mM$.
Constante des gaz parfaits | $R=8{,}314$ J·mol⁻¹·K⁻¹ | Volume molaire ≈ 24 L·mol⁻¹ à 20 °C et 1 bar.
Masses de l'électron et du proton | $m_e=9{,}11\times10^{-31}$ kg et $m_p=1{,}67\times10^{-27}$ kg | Le proton est environ 1 836 fois plus lourd que l'électron.
Domaine du visible | $400\text{ nm}<\lambda<800\text{ nm}$ | Violet vers 400 nm, rouge vers 750-800 nm.
Domaine audible | $20\text{ Hz}<f<20\text{ kHz}$ | En dessous : infrasons ; au-dessus : ultrasons.
`);
