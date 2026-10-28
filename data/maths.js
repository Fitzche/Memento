// Mathématiques : terminale spécialité + maths expertes (et quelques indispensables de première).
// Champs : résultat | énoncé | à retenir
MEMENTO.add('maths', String.raw`
# Second degré et polynômes
> Les outils de première à maîtriser sans hésiter.
Discriminant | Pour $ax^2+bx+c$ avec $a\neq0$ : $\Delta=b^2-4ac$. Si $\Delta>0$, deux racines $x_{1,2}=\dfrac{-b\pm\sqrt{\Delta}}{2a}$ ; si $\Delta=0$, une racine double $x_0=-\dfrac{b}{2a}$ ; si $\Delta<0$, aucune racine réelle. | Si $\Delta<0$ le trinôme garde le signe de $a$ sur $\mathbb{R}$.
Forme canonique | $ax^2+bx+c=a\left(x-\alpha\right)^2+\beta$ avec $\alpha=-\dfrac{b}{2a}$ et $\beta=f(\alpha)=-\dfrac{\Delta}{4a}$. | Le sommet de la parabole est le point $(\alpha;\beta)$.
Factorisation d'un trinôme | Si $\Delta\geq0$ : $ax^2+bx+c=a(x-x_1)(x-x_2)$. | Si $\Delta=0$ : $a(x-x_0)^2$.
Signe d'un trinôme | $ax^2+bx+c$ est du signe de $a$ à l'extérieur des racines et du signe de $-a$ entre les racines. | « Signe de $a$ à l'extérieur ».
Somme et produit des racines | Si $x_1,x_2$ sont les racines de $ax^2+bx+c$ : $x_1+x_2=-\dfrac{b}{a}$ et $x_1x_2=\dfrac{c}{a}$. | Pratique pour trouver la 2e racine quand on en connaît une évidente.
Racine d'un polynôme et factorisation | Si $P(a)=0$, alors $P(x)=(x-a)Q(x)$ avec $\deg Q=\deg P-1$. | Un polynôme de degré $n$ a au plus $n$ racines.
Identités remarquables | $(a+b)^2=a^2+2ab+b^2$, $(a-b)^2=a^2-2ab+b^2$, $(a-b)(a+b)=a^2-b^2$. | Aussi : $a^3-b^3=(a-b)(a^2+ab+b^2)$.
Formule du binôme de Newton | $(a+b)^n=\displaystyle\sum_{k=0}^{n}\binom{n}{k}a^kb^{n-k}$. | Les coefficients se lisent dans le triangle de Pascal.

# Suites
> Suites arithmétiques, géométriques, récurrence, convergence.
Suite arithmétique | $u_{n+1}=u_n+r$ ; terme général $u_n=u_0+nr=u_p+(n-p)r$. | Somme : $\text{(nombre de termes)}\times\dfrac{\text{premier}+\text{dernier}}{2}$.
Somme des entiers | $1+2+\dots+n=\dfrac{n(n+1)}{2}$. | Cas particulier de la somme arithmétique.
Suite géométrique | $u_{n+1}=q\,u_n$ ; terme général $u_n=u_0\,q^n=u_p\,q^{n-p}$. | Somme : $\text{premier terme}\times\dfrac{1-q^{\text{nb de termes}}}{1-q}$ pour $q\neq1$.
Somme géométrique | Pour $q\neq1$ : $1+q+q^2+\dots+q^n=\dfrac{1-q^{n+1}}{1-q}$. | À connaître par cœur, sert partout (suites, probas, complexes).
Limite de $q^n$ | Si $q>1$, $q^n\to+\infty$ ; si $-1<q<1$, $q^n\to0$ ; si $q=1$, $q^n=1$ ; si $q\leq-1$, pas de limite. | Se démontre avec l'inégalité de Bernoulli pour $q>1$.
Inégalité de Bernoulli | Pour tout réel $a>0$ et tout entier $n\geq0$ : $(1+a)^n\geq1+na$. | Démonstration classique par récurrence.
Principe de récurrence | Si $P(n_0)$ est vraie (initialisation) et si, pour tout $n\geq n_0$, $P(n)\Rightarrow P(n+1)$ (hérédité), alors $P(n)$ est vraie pour tout $n\geq n_0$. | Rédiger : initialisation, hérédité (on suppose $P(n)$), conclusion.
Suite majorée, minorée, bornée | $(u_n)$ est majorée s'il existe $M$ tel que $u_n\leq M$ pour tout $n$ ; minorée si $u_n\geq m$ ; bornée si les deux. | Un majorant ne dépend pas de $n$.
Théorème de convergence monotone | Toute suite croissante et majorée converge ; toute suite décroissante et minorée converge. | Donne l'existence de la limite, pas sa valeur. La limite $\ell$ vérifie $u_n\leq\ell$ (suite croissante).
Suite croissante non majorée | Toute suite croissante non majorée tend vers $+\infty$. | De même, décroissante non minorée $\Rightarrow-\infty$.
Théorème des gendarmes | Si $v_n\leq u_n\leq w_n$ à partir d'un certain rang et si $(v_n)$ et $(w_n)$ tendent vers la même limite $\ell$, alors $u_n\to\ell$. | Aussi appelé théorème d'encadrement.
Théorème de comparaison | Si $u_n\leq v_n$ à partir d'un certain rang et $u_n\to+\infty$, alors $v_n\to+\infty$. Si $u_n\leq v_n$ et $v_n\to-\infty$, alors $u_n\to-\infty$. | Version « infinie » des gendarmes : un seul minorant suffit.
Passage à la limite dans les inégalités | Si $u_n\leq v_n$ à partir d'un certain rang et si les deux suites convergent, alors $\lim u_n\leq\lim v_n$. | Attention : les inégalités strictes deviennent larges.
Unicité de la limite | Si une suite converge, sa limite est unique.
Suite convergente bornée | Toute suite convergente est bornée. | La réciproque est fausse : $(-1)^n$ est bornée mais diverge.
Théorème du point fixe | Si $u_{n+1}=f(u_n)$, que $(u_n)$ converge vers $\ell$ et que $f$ est continue en $\ell$, alors $f(\ell)=\ell$. | On cherche la limite parmi les solutions de $f(x)=x$.
Suites adjacentes | Si $(u_n)$ croît, $(v_n)$ décroît et $v_n-u_n\to0$, alors elles convergent vers la même limite $\ell$ et $u_n\leq\ell\leq v_n$. | Hors programme officiel mais très classique (approximation de $\pi$, $e$).
Croissances comparées (suites) | Pour $a>1$ et $p>0$ : $\dfrac{a^n}{n^p}\to+\infty$ et $\dfrac{n!}{a^n}\to+\infty$. | « L'exponentielle l'emporte sur la puissance, la factorielle sur l'exponentielle ».
Suite arithmético-géométrique | $u_{n+1}=au_n+b$ avec $a\neq1$ : on pose $\ell=\dfrac{b}{1-a}$ ; alors $v_n=u_n-\ell$ est géométrique de raison $a$. | Méthode : chercher le point fixe, puis la suite auxiliaire.

# Limites et continuité
> Limites de fonctions, asymptotes, continuité, TVI.
Limites usuelles | $\displaystyle\lim_{x\to+\infty}\frac1x=0$, $\displaystyle\lim_{x\to0^+}\frac1x=+\infty$, $\displaystyle\lim_{x\to+\infty}\sqrt x=+\infty$, $\displaystyle\lim_{x\to+\infty}x^n=+\infty$.
Formes indéterminées | $\infty-\infty$, $0\times\infty$, $\dfrac{\infty}{\infty}$, $\dfrac00$ (et $1^\infty$, $0^0$, $\infty^0$). | On lève l'indétermination : factoriser par le terme dominant, quantité conjuguée, croissances comparées.
Limite d'un polynôme ou d'une fraction rationnelle à l'infini | Un polynôme a la même limite en $\pm\infty$ que son terme de plus haut degré ; une fraction rationnelle, celle du quotient de ses termes de plus haut degré. | Ex : $\dfrac{3x^2+1}{x^2-5}\to3$.
Asymptote horizontale | Si $\displaystyle\lim_{x\to\pm\infty}f(x)=\ell$, la droite $y=\ell$ est asymptote horizontale à $C_f$.
Asymptote verticale | Si $\displaystyle\lim_{x\to a}f(x)=\pm\infty$, la droite $x=a$ est asymptote verticale. | Souvent en une valeur interdite.
Asymptote oblique | Si $\displaystyle\lim_{x\to\pm\infty}\left[f(x)-(ax+b)\right]=0$, la droite $y=ax+b$ est asymptote oblique. | Le signe de $f(x)-(ax+b)$ donne la position relative.
Limite d'une composée | Si $\displaystyle\lim_{x\to a}u(x)=b$ et $\displaystyle\lim_{X\to b}v(X)=c$, alors $\displaystyle\lim_{x\to a}v(u(x))=c$. | $a$, $b$, $c$ peuvent être infinis.
Gendarmes pour les fonctions | Si $g\leq f\leq h$ au voisinage de $a$ et $\lim g=\lim h=\ell$ en $a$, alors $\lim_{a}f=\ell$. | Ex : $\dfrac{\sin x}{x}\to0$ en $+\infty$.
Continuité | $f$ est continue en $a$ si $\displaystyle\lim_{x\to a}f(x)=f(a)$. | Graphiquement : on trace la courbe sans lever le crayon.
Dérivable implique continue | Toute fonction dérivable en $a$ est continue en $a$. | Réciproque fausse : $\lvert x\rvert$ est continue en 0 mais pas dérivable.
Image d'une suite par une fonction continue | Si $u_n\to\ell$ et $f$ est continue en $\ell$, alors $f(u_n)\to f(\ell)$. | Justifie le théorème du point fixe.
Théorème des valeurs intermédiaires | Si $f$ est continue sur $[a;b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, l'équation $f(x)=k$ a au moins une solution dans $[a;b]$. | Existence d'une solution, pas unicité.
Corollaire du TVI (bijection) | Si $f$ est continue et strictement monotone sur $[a;b]$, alors pour tout $k$ entre $f(a)$ et $f(b)$, l'équation $f(x)=k$ a une unique solution dans $[a;b]$. | Valable aussi sur un intervalle ouvert avec les limites aux bornes. Approximation par dichotomie ou balayage.
Limite de $\dfrac{\sin x}{x}$ | $\displaystyle\lim_{x\to0}\frac{\sin x}{x}=1$. | C'est le nombre dérivé de $\sin$ en 0.
Limite de $\dfrac{e^x-1}{x}$ et $\dfrac{\ln(1+x)}{x}$ | $\displaystyle\lim_{x\to0}\frac{e^x-1}{x}=1$ et $\displaystyle\lim_{x\to0}\frac{\ln(1+x)}{x}=1$. | Nombres dérivés de $\exp$ en 0 et de $\ln$ en 1.

# Dérivation et convexité
> Dérivées, tangentes, variations, convexité.
Nombre dérivé | $f'(a)=\displaystyle\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$ (si cette limite existe et est finie). | C'est la pente de la tangente en $a$.
Équation de la tangente | La tangente à $C_f$ au point d'abscisse $a$ a pour équation $y=f'(a)(x-a)+f(a)$.
Dérivées usuelles | $(x^n)'=nx^{n-1}$, $\left(\dfrac1x\right)'=-\dfrac1{x^2}$, $(\sqrt x)'=\dfrac1{2\sqrt x}$, $(e^x)'=e^x$, $(\ln x)'=\dfrac1x$, $(\sin x)'=\cos x$, $(\cos x)'=-\sin x$. | $\sqrt x$ n'est pas dérivable en 0.
Dérivée d'un produit | $(uv)'=u'v+uv'$.
Dérivée d'un quotient | $\left(\dfrac uv\right)'=\dfrac{u'v-uv'}{v^2}$ et $\left(\dfrac1v\right)'=-\dfrac{v'}{v^2}$. | Là où $v\neq0$.
Dérivée d'une composée | $\left(g\circ u\right)'=u'\times\left(g'\circ u\right)$, c'est-à-dire $\left[g(u(x))\right]'=u'(x)\,g'(u(x))$. | Cas particuliers : $(u^n)'=nu'u^{n-1}$, $(e^u)'=u'e^u$, $(\ln u)'=\dfrac{u'}{u}$, $(\sqrt u)'=\dfrac{u'}{2\sqrt u}$.
Dérivée de $f(ax+b)$ | $\left[f(ax+b)\right]'=a\,f'(ax+b)$. | Cas simple de la composée.
Signe de la dérivée et variations | Sur un intervalle $I$ : si $f'\geq0$, $f$ est croissante ; si $f'\leq0$, décroissante ; si $f'=0$, constante. | Si $f'>0$ sauf en des points isolés, $f$ est strictement croissante.
Extremum local | Si $f$ est dérivable et admet un extremum local en $a$ (intérieur à $I$), alors $f'(a)=0$. Si $f'$ s'annule en changeant de signe en $a$, $f$ admet un extremum local en $a$. | $f'(a)=0$ ne suffit pas : $x^3$ en 0.
Fonction convexe | $f$ est convexe sur $I$ si sa courbe est au-dessus de ses tangentes, ou de façon équivalente en dessous de ses cordes. | Concave : l'inverse.
Convexité et dérivée seconde | Si $f$ est deux fois dérivable : $f$ convexe $\Leftrightarrow$ $f''\geq0$ $\Leftrightarrow$ $f'$ croissante. | $f$ concave $\Leftrightarrow f''\leq0$.
Point d'inflexion | Point où la courbe traverse sa tangente : la convexité change. Si $f''$ s'annule en changeant de signe en $a$, le point d'abscisse $a$ est un point d'inflexion. | Ex : $x^3$ en 0.
Inégalité de convexité de l'exponentielle | Pour tout réel $x$ : $e^x\geq1+x$. | Tangente en 0 sous la courbe, car $\exp$ est convexe.
Inégalité de concavité du logarithme | Pour tout $x>0$ : $\ln x\leq x-1$. | Tangente en 1 au-dessus de la courbe, car $\ln$ est concave.
Inégalité des accroissements finis | Si $\lvert f'\rvert\leq M$ sur $[a;b]$, alors $\lvert f(b)-f(a)\rvert\leq M\lvert b-a\rvert$. | Utile pour étudier la vitesse de convergence d'une suite récurrente.

# Exponentielle et logarithme
> Propriétés algébriques, limites, croissances comparées.
Définition de l'exponentielle | $\exp$ est l'unique fonction dérivable sur $\mathbb{R}$ telle que $f'=f$ et $f(0)=1$. | On note $e^x=\exp(x)$, avec $e\approx2{,}718$.
Propriétés algébriques de l'exponentielle | $e^{a+b}=e^ae^b$, $e^{-a}=\dfrac1{e^a}$, $e^{a-b}=\dfrac{e^a}{e^b}$, $(e^a)^n=e^{na}$. | $e^x>0$ pour tout $x$.
Limites de l'exponentielle | $\displaystyle\lim_{x\to+\infty}e^x=+\infty$ et $\displaystyle\lim_{x\to-\infty}e^x=0$. | Asymptote horizontale $y=0$ en $-\infty$.
Croissances comparées (exponentielle) | Pour tout entier $n$ : $\displaystyle\lim_{x\to+\infty}\frac{e^x}{x^n}=+\infty$ et $\displaystyle\lim_{x\to-\infty}x^ne^x=0$. | L'exponentielle l'emporte sur toute puissance.
Définition du logarithme népérien | Pour $x>0$, $\ln x$ est l'unique réel $y$ tel que $e^y=x$. | $\ln$ est la réciproque de $\exp$ : $e^{\ln x}=x$ ($x>0$) et $\ln(e^x)=x$.
Propriétés algébriques du logarithme | $\ln(ab)=\ln a+\ln b$, $\ln\dfrac1a=-\ln a$, $\ln\dfrac ab=\ln a-\ln b$, $\ln(a^n)=n\ln a$, $\ln\sqrt a=\dfrac12\ln a$. | Pour $a>0$, $b>0$.
Valeurs remarquables de ln | $\ln1=0$, $\ln e=1$ ; $\ln x<0$ si $0<x<1$ et $\ln x>0$ si $x>1$.
Limites du logarithme | $\displaystyle\lim_{x\to+\infty}\ln x=+\infty$ et $\displaystyle\lim_{x\to0^+}\ln x=-\infty$. | Asymptote verticale $x=0$.
Croissances comparées (logarithme) | $\displaystyle\lim_{x\to+\infty}\frac{\ln x}{x^n}=0$ et $\displaystyle\lim_{x\to0^+}x^n\ln x=0$ (pour $n\geq1$). | Les puissances l'emportent sur le logarithme.
Équations et inéquations avec exp et ln | $e^a=e^b\Leftrightarrow a=b$ ; $e^a<e^b\Leftrightarrow a<b$ ; pour $a,b>0$ : $\ln a<\ln b\Leftrightarrow a<b$. | Exp et ln sont strictement croissantes.
Dérivée de $\ln(u)$ | Si $u>0$ est dérivable : $\left(\ln u\right)'=\dfrac{u'}{u}$.
Puissance réelle | Pour $a>0$ et $x$ réel : $a^x=e^{x\ln a}$. | Permet de résoudre $q^n\geq A$ : $n\geq\dfrac{\ln A}{\ln q}$ si $q>1$ (on change le sens si $\ln q<0$).
Logarithme décimal | $\log x=\dfrac{\ln x}{\ln10}$, avec $\log(10^n)=n$. | Utilisé en chimie (pH) et en physique (décibels).

# Primitives et intégrales
> Primitives, intégrale, aire, valeur moyenne, IPP.
Primitive | $F$ est une primitive de $f$ sur $I$ si $F'=f$. Deux primitives d'une même fonction diffèrent d'une constante. | Toute fonction continue sur un intervalle admet des primitives.
Primitives usuelles | $x^n\mapsto\dfrac{x^{n+1}}{n+1}$ ($n\neq-1$), $\dfrac1x\mapsto\ln x$ ($x>0$), $e^x\mapsto e^x$, $\cos x\mapsto\sin x$, $\sin x\mapsto-\cos x$, $\dfrac1{\sqrt x}\mapsto2\sqrt x$. | Toujours vérifier en dérivant.
Primitives de formes composées | $u'u^n\mapsto\dfrac{u^{n+1}}{n+1}$, $\dfrac{u'}{u}\mapsto\ln\lvert u\rvert$, $u'e^u\mapsto e^u$, $\dfrac{u'}{u^2}\mapsto-\dfrac1u$, $\dfrac{u'}{\sqrt u}\mapsto2\sqrt u$. | Reconnaître la forme $u'\times g'(u)$.
Théorème fondamental de l'analyse | Si $f$ est continue sur $I$ et $a\in I$, la fonction $F(x)=\displaystyle\int_a^xf(t)\,dt$ est l'unique primitive de $f$ qui s'annule en $a$. | Donc $F'=f$.
Calcul d'une intégrale | Si $F$ est une primitive de $f$ continue : $\displaystyle\int_a^bf(x)\,dx=F(b)-F(a)$. | Notation $\left[F(x)\right]_a^b$.
Intégrale et aire | Si $f\geq0$ et continue sur $[a;b]$ avec $a<b$, $\displaystyle\int_a^bf(x)\,dx$ est l'aire (en unités d'aire) du domaine entre la courbe, l'axe des abscisses et les droites $x=a$, $x=b$. | Si $f\leq0$, l'intégrale est l'opposé de l'aire.
Aire entre deux courbes | Si $f\geq g$ sur $[a;b]$, l'aire entre les courbes est $\displaystyle\int_a^b\left(f(x)-g(x)\right)dx$.
Linéarité de l'intégrale | $\displaystyle\int_a^b\left(\alpha f+\beta g\right)=\alpha\int_a^bf+\beta\int_a^bg$.
Relation de Chasles | $\displaystyle\int_a^bf+\int_b^cf=\int_a^cf$, et $\displaystyle\int_b^af=-\int_a^bf$.
Positivité et croissance de l'intégrale | Si $a\leq b$ et $f\geq0$ sur $[a;b]$, alors $\displaystyle\int_a^bf\geq0$. Si $f\leq g$, alors $\displaystyle\int_a^bf\leq\int_a^bg$. | Sert à encadrer une intégrale ou une suite d'intégrales.
Valeur moyenne | La valeur moyenne de $f$ sur $[a;b]$ est $\mu=\dfrac1{b-a}\displaystyle\int_a^bf(x)\,dx$. | Encadrement : si $m\leq f\leq M$, alors $m\leq\mu\leq M$.
Intégration par parties | $\displaystyle\int_a^bu(x)v'(x)\,dx=\left[u(x)v(x)\right]_a^b-\int_a^bu'(x)v(x)\,dx$. | Pour $u$, $v$ de classe $C^1$. Choisir $u$ qui se simplifie en dérivant (polynôme, $\ln$).

# Équations différentielles
> Programme de terminale spécialité.
Équation $y'=ay$ | Les solutions de $y'=ay$ sont les fonctions $x\mapsto Ce^{ax}$, $C\in\mathbb{R}$. | Avec une condition initiale $y(x_0)=y_0$, la solution est unique.
Équation $y'=ay+b$ | Pour $a\neq0$, les solutions sont $x\mapsto Ce^{ax}-\dfrac ba$, $C\in\mathbb{R}$. | $-\dfrac ba$ est la solution constante (particulière).
Équation $y'=ay+f$ | Les solutions sont les fonctions $y_p+Ce^{ax}$, où $y_p$ est une solution particulière. | Solution générale = particulière + solutions de l'équation homogène.
Primitive et équation $y'=f$ | Les solutions de $y'=f$ sont les primitives de $f$. | Équation différentielle la plus simple.

# Trigonométrie
> Cercle trigonométrique, formules, fonctions sinus et cosinus.
Relation fondamentale | Pour tout réel $x$ : $\cos^2x+\sin^2x=1$. | Se lit sur le cercle trigonométrique (Pythagore).
Valeurs remarquables | $\cos\frac\pi6=\frac{\sqrt3}2$, $\sin\frac\pi6=\frac12$ ; $\cos\frac\pi4=\sin\frac\pi4=\frac{\sqrt2}2$ ; $\cos\frac\pi3=\frac12$, $\sin\frac\pi3=\frac{\sqrt3}2$. | $\cos0=1$, $\sin\frac\pi2=1$, $\cos\pi=-1$.
Angles associés | $\cos(-x)=\cos x$, $\sin(-x)=-\sin x$, $\cos(\pi-x)=-\cos x$, $\sin(\pi-x)=\sin x$, $\cos\left(\frac\pi2-x\right)=\sin x$, $\sin\left(\frac\pi2-x\right)=\cos x$. | Se retrouvent sur le cercle.
Formules d'addition | $\cos(a+b)=\cos a\cos b-\sin a\sin b$ et $\sin(a+b)=\sin a\cos b+\cos a\sin b$. | Se retrouvent avec $e^{i(a+b)}=e^{ia}e^{ib}$.
Formules de duplication | $\cos2a=\cos^2a-\sin^2a=2\cos^2a-1=1-2\sin^2a$ et $\sin2a=2\sin a\cos a$. | Servent à linéariser $\cos^2$ et $\sin^2$.
Équations trigonométriques | $\cos x=\cos a\Leftrightarrow x=a+2k\pi$ ou $x=-a+2k\pi$ ; $\sin x=\sin a\Leftrightarrow x=a+2k\pi$ ou $x=\pi-a+2k\pi$ ($k\in\mathbb{Z}$).
Propriétés des fonctions sinus et cosinus | $\sin$ et $\cos$ sont $2\pi$-périodiques ; $\cos$ est paire, $\sin$ est impaire. | Dérivées : $\sin'=\cos$, $\cos'=-\sin$.
Fonction tangente | $\tan x=\dfrac{\sin x}{\cos x}$ pour $x\neq\frac\pi2+k\pi$ ; elle est $\pi$-périodique et $\tan'=1+\tan^2=\dfrac1{\cos^2}$.
Lien degrés et radians | $180°=\pi$ rad. | Un tour complet vaut $2\pi$.
Formule d'Al-Kashi | Dans un triangle $ABC$ : $BC^2=AB^2+AC^2-2\,AB\cdot AC\cos\widehat{A}$. | Généralise Pythagore.

# Produit scalaire et géométrie dans l'espace
> Vecteurs, droites, plans, orthogonalité.
Produit scalaire : définitions | $\vec u\cdot\vec v=\lVert\vec u\rVert\lVert\vec v\rVert\cos(\vec u,\vec v)$ ; en repère orthonormé, $\vec u\cdot\vec v=xx'+yy'+zz'$. | Aussi : $\vec u\cdot\vec v=\frac12\left(\lVert\vec u+\vec v\rVert^2-\lVert\vec u\rVert^2-\lVert\vec v\rVert^2\right)$.
Orthogonalité et produit scalaire | $\vec u\perp\vec v\Leftrightarrow\vec u\cdot\vec v=0$. | Le vecteur nul est orthogonal à tout vecteur.
Projeté orthogonal | Si $H$ est le projeté orthogonal de $C$ sur $(AB)$ : $\overrightarrow{AB}\cdot\overrightarrow{AC}=\overrightarrow{AB}\cdot\overrightarrow{AH}$. | Le projeté orthogonal réalise la plus courte distance.
Norme d'un vecteur | En repère orthonormé : $\lVert\vec u\rVert=\sqrt{x^2+y^2+z^2}$ ; $AB=\sqrt{(x_B-x_A)^2+(y_B-y_A)^2+(z_B-z_A)^2}$. | $\lVert\vec u\rVert^2=\vec u\cdot\vec u$.
Vecteurs colinéaires | $\vec u$ et $\vec v$ sont colinéaires s'il existe $k$ tel que $\vec v=k\vec u$. Dans le plan : $xy'-x'y=0$. | Trois points sont alignés si deux vecteurs qu'ils forment sont colinéaires.
Vecteurs coplanaires | $\vec u$, $\vec v$, $\vec w$ sont coplanaires s'il existe $a$, $b$ tels que $\vec w=a\vec u+b\vec v$ (avec $\vec u$, $\vec v$ non colinéaires). | Trois vecteurs non coplanaires forment une base de l'espace.
Représentation paramétrique d'une droite | La droite passant par $A(x_A;y_A;z_A)$ et dirigée par $\vec u(a;b;c)$ : $\left\{x=x_A+at\ ;\ y=y_A+bt\ ;\ z=z_A+ct\right\}$, $t\in\mathbb{R}$. | Une droite a une infinité de représentations paramétriques.
Équation cartésienne d'un plan | Un plan de vecteur normal $\vec n(a;b;c)$ a une équation $ax+by+cz+d=0$. | Le vecteur normal est orthogonal à deux vecteurs non colinéaires du plan.
Droite orthogonale à un plan | Une droite est orthogonale à un plan si et seulement si elle est orthogonale à deux droites sécantes de ce plan. | Elle est alors orthogonale à toutes les droites du plan.
Positions relatives de deux droites dans l'espace | Deux droites sont soit coplanaires (sécantes ou parallèles), soit non coplanaires. | Non coplanaires : ni parallèles ni sécantes.
Théorème du toit | Si deux plans sécants contiennent respectivement deux droites parallèles, leur droite d'intersection est parallèle à ces deux droites. | Classique pour construire des sections.
Distance d'un point à un plan | Distance de $M(x_0;y_0;z_0)$ au plan $ax+by+cz+d=0$ : $\dfrac{\lvert ax_0+by_0+cz_0+d\rvert}{\sqrt{a^2+b^2+c^2}}$. | C'est la distance $MH$ au projeté orthogonal $H$.
Équation d'un cercle et d'une sphère | Cercle de centre $\Omega(a;b)$ et de rayon $r$ : $(x-a)^2+(y-b)^2=r^2$. Sphère : $(x-a)^2+(y-b)^2+(z-c)^2=r^2$. | $M$ est sur le cercle de diamètre $[AB]$ $\Leftrightarrow\overrightarrow{MA}\cdot\overrightarrow{MB}=0$.
Vecteur normal à une droite du plan | La droite $ax+by+c=0$ a pour vecteur normal $\vec n(a;b)$ et pour vecteur directeur $\vec u(-b;a)$.

# Dénombrement
> Listes, arrangements, permutations, combinaisons.
Principe multiplicatif | Le nombre d'éléments de $E_1\times E_2\times\dots\times E_p$ est $\mathrm{card}(E_1)\times\dots\times\mathrm{card}(E_p)$. | Nombre de $p$-uplets d'un ensemble à $n$ éléments : $n^p$.
Cardinal de l'ensemble des parties | Un ensemble à $n$ éléments possède $2^n$ parties. | Chaque élément est dans la partie ou non.
Arrangements | Nombre de $p$-uplets d'éléments distincts d'un ensemble à $n$ éléments : $\dfrac{n!}{(n-p)!}=n(n-1)\cdots(n-p+1)$. | L'ordre compte, sans répétition.
Permutations | Nombre de permutations d'un ensemble à $n$ éléments : $n!=n\times(n-1)\times\dots\times1$. | Par convention $0!=1$.
Combinaisons | Nombre de parties à $k$ éléments d'un ensemble à $n$ éléments : $\dbinom nk=\dfrac{n!}{k!\,(n-k)!}$. | L'ordre ne compte pas.
Symétrie des coefficients binomiaux | $\dbinom nk=\dbinom n{n-k}$. | Choisir $k$ éléments revient à choisir les $n-k$ restants.
Relation de Pascal | $\dbinom nk+\dbinom n{k+1}=\dbinom{n+1}{k+1}$. | Construction du triangle de Pascal.
Somme des coefficients binomiaux | $\displaystyle\sum_{k=0}^n\binom nk=2^n$. | Conséquence du binôme avec $a=b=1$, ou du cardinal des parties.

# Probabilités
> Conditionnement, indépendance, lois discrètes, espérance, inégalités.
Probabilité de la réunion | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. | Si $A$ et $B$ sont incompatibles : $P(A\cup B)=P(A)+P(B)$.
Événement contraire | $P(\overline A)=1-P(A)$. | « Au moins un » : passer par le contraire « aucun ».
Probabilité conditionnelle | Si $P(A)\neq0$ : $P_A(B)=\dfrac{P(A\cap B)}{P(A)}$, donc $P(A\cap B)=P(A)\,P_A(B)$. | Dans un arbre : on multiplie les probabilités le long d'un chemin.
Formule des probabilités totales | Si $A_1,\dots,A_n$ forment une partition de l'univers : $P(B)=\displaystyle\sum_{i=1}^nP(A_i)\,P_{A_i}(B)$. | Dans un arbre : on additionne les chemins menant à $B$.
Formule de Bayes | $P_B(A)=\dfrac{P(A)\,P_A(B)}{P(B)}$. | Permet d'« inverser » un conditionnement (tests médicaux).
Indépendance de deux événements | $A$ et $B$ sont indépendants si $P(A\cap B)=P(A)\,P(B)$, c'est-à-dire $P_A(B)=P(B)$ si $P(A)\neq0$. | Si $A$ et $B$ sont indépendants, $A$ et $\overline B$ le sont aussi.
Espérance d'une variable aléatoire | $E(X)=\displaystyle\sum_ix_i\,P(X=x_i)$. | Linéarité : $E(aX+b)=aE(X)+b$ et $E(X+Y)=E(X)+E(Y)$.
Variance et écart type | $V(X)=E\left[(X-E(X))^2\right]=E(X^2)-E(X)^2$ et $\sigma(X)=\sqrt{V(X)}$. | $V(aX+b)=a^2V(X)$.
Variance d'une somme | Si $X$ et $Y$ sont indépendantes : $V(X+Y)=V(X)+V(Y)$. | Pas de formule aussi simple si elles ne sont pas indépendantes.
Loi de Bernoulli | $X$ suit $\mathcal B(p)$ si $P(X=1)=p$ et $P(X=0)=1-p$. Alors $E(X)=p$ et $V(X)=p(1-p)$. | Modélise une épreuve à deux issues (succès / échec).
Loi binomiale | $X$ compte le nombre de succès dans $n$ épreuves de Bernoulli indépendantes de paramètre $p$ : $P(X=k)=\dbinom nkp^k(1-p)^{n-k}$. | Notation $\mathcal B(n;p)$.
Espérance et variance de la loi binomiale | Si $X\sim\mathcal B(n;p)$ : $E(X)=np$, $V(X)=np(1-p)$, $\sigma(X)=\sqrt{np(1-p)}$. | $X$ est une somme de $n$ variables de Bernoulli indépendantes.
Loi géométrique | Rang du premier succès dans des épreuves de Bernoulli indépendantes : $P(X=k)=(1-p)^{k-1}p$ pour $k\geq1$, et $E(X)=\dfrac1p$. | Loi « sans mémoire » : $P_{X>n}(X>n+k)=P(X>k)$.
Loi uniforme discrète | $X$ uniforme sur $\{1;\dots;n\}$ : $P(X=k)=\dfrac1n$, $E(X)=\dfrac{n+1}2$. | Exemple : un dé équilibré.
Somme de variables aléatoires identiques | Si $S_n=X_1+\dots+X_n$ avec des $X_i$ indépendantes de même loi : $E(S_n)=nE(X_1)$ et $V(S_n)=nV(X_1)$. | Pour la moyenne $M_n=\frac{S_n}n$ : $E(M_n)=E(X_1)$, $V(M_n)=\dfrac{V(X_1)}n$.
Inégalité de Markov | Si $X\geq0$ et $a>0$ : $P(X\geq a)\leq\dfrac{E(X)}a$. | Majoration grossière mais toujours valable.
Inégalité de Bienaymé-Tchebychev | Pour tout $\delta>0$ : $P\left(\lvert X-E(X)\rvert\geq\delta\right)\leq\dfrac{V(X)}{\delta^2}$. | Plus on s'écarte de l'espérance, moins c'est probable.
Inégalité de concentration | Si $M_n$ est la moyenne de $n$ variables indépendantes de même loi que $X$ : $P\left(\lvert M_n-E(X)\rvert\geq\delta\right)\leq\dfrac{V(X)}{n\delta^2}$. | Permet de déterminer une taille d'échantillon $n$.
Loi faible des grands nombres | Pour tout $\delta>0$ : $\displaystyle\lim_{n\to+\infty}P\left(\lvert M_n-E(X)\rvert\geq\delta\right)=0$. | La moyenne d'un grand échantillon se rapproche de l'espérance.

# Nombres complexes
> Maths expertes : formes algébrique, trigonométrique, exponentielle.
Forme algébrique | Tout complexe s'écrit de façon unique $z=a+ib$ avec $a=\mathrm{Re}(z)$, $b=\mathrm{Im}(z)$ réels, et $i^2=-1$. | $z$ est réel si $b=0$, imaginaire pur si $a=0$.
Conjugué | $\overline z=a-ib$ ; $\overline{z+z'}=\overline z+\overline{z'}$, $\overline{zz'}=\overline z\,\overline{z'}$, $\overline{\left(\frac z{z'}\right)}=\dfrac{\overline z}{\overline{z'}}$. | $z+\overline z=2\mathrm{Re}(z)$ et $z-\overline z=2i\,\mathrm{Im}(z)$.
Module | $\lvert z\rvert=\sqrt{a^2+b^2}=\sqrt{z\overline z}$ ; $\lvert zz'\rvert=\lvert z\rvert\lvert z'\rvert$ et $\left\lvert\frac z{z'}\right\rvert=\dfrac{\lvert z\rvert}{\lvert z'\rvert}$. | $AB=\lvert z_B-z_A\rvert$.
Inégalité triangulaire | $\lvert z+z'\rvert\leq\lvert z\rvert+\lvert z'\rvert$.
Argument | Si $z\neq0$, un argument $\theta$ de $z$ vérifie $\cos\theta=\dfrac a{\lvert z\rvert}$ et $\sin\theta=\dfrac b{\lvert z\rvert}$. $\arg(zz')=\arg z+\arg z'$ [$2\pi$]. | $\arg\left(\frac{z_C-z_A}{z_B-z_A}\right)=(\overrightarrow{AB},\overrightarrow{AC})$.
Forme exponentielle | $z=re^{i\theta}$ avec $r=\lvert z\rvert$ et $e^{i\theta}=\cos\theta+i\sin\theta$. | $re^{i\theta}\times r'e^{i\theta'}=rr'e^{i(\theta+\theta')}$.
Formule de Moivre | $\left(\cos\theta+i\sin\theta\right)^n=\cos(n\theta)+i\sin(n\theta)$, soit $\left(e^{i\theta}\right)^n=e^{in\theta}$. | Sert à exprimer $\cos(n\theta)$ en fonction de $\cos\theta$.
Formules d'Euler | $\cos\theta=\dfrac{e^{i\theta}+e^{-i\theta}}2$ et $\sin\theta=\dfrac{e^{i\theta}-e^{-i\theta}}{2i}$. | Servent à linéariser $\cos^n$ et $\sin^n$.
Équation du second degré à coefficients réels | Si $\Delta<0$, $az^2+bz+c=0$ a deux solutions complexes conjuguées $z_{1,2}=\dfrac{-b\pm i\sqrt{-\Delta}}{2a}$. | Formules de somme et produit inchangées.
Racines n-ièmes de l'unité | Les solutions de $z^n=1$ sont les $n$ nombres $e^{\frac{2ik\pi}n}$, $k\in\{0;\dots;n-1\}$. | Leur somme est nulle (pour $n\geq2$) ; elles forment un polygone régulier.
Factorisation de $z^n-a^n$ | $z^n-a^n=(z-a)\left(z^{n-1}+az^{n-2}+\dots+a^{n-1}\right)$. | Un polynôme de degré $n$ a au plus $n$ racines complexes.
Interprétation géométrique | $\dfrac{z_C-z_A}{z_B-z_A}$ réel $\Leftrightarrow$ $A$, $B$, $C$ alignés ; imaginaire pur $\Leftrightarrow$ $(AB)\perp(AC)$. | Le module donne le rapport $\dfrac{AC}{AB}$.

# Arithmétique
> Maths expertes : divisibilité, congruences, PGCD, nombres premiers.
Division euclidienne | Pour $a\in\mathbb{Z}$ et $b\in\mathbb{N}^*$, il existe un unique couple $(q;r)$ tel que $a=bq+r$ et $0\leq r<b$. | $q$ est le quotient, $r$ le reste.
Divisibilité et combinaisons linéaires | Si $d$ divise $a$ et $b$, alors $d$ divise $au+bv$ pour tous entiers $u$, $v$. | Outil de base pour les PGCD.
Congruences et opérations | Si $a\equiv b\ [n]$ et $c\equiv d\ [n]$, alors $a+c\equiv b+d$, $ac\equiv bd$ et $a^k\equiv b^k\ [n]$. | On ne peut pas « diviser » une congruence en général.
Algorithme d'Euclide | $\mathrm{PGCD}(a;b)=\mathrm{PGCD}(b;r)$ où $r$ est le reste de la division de $a$ par $b$. Le PGCD est le dernier reste non nul. | Fournit aussi les coefficients de Bézout en remontant.
Théorème de Bézout | $a$ et $b$ sont premiers entre eux $\Leftrightarrow$ il existe des entiers $u$, $v$ tels que $au+bv=1$. | Plus généralement, il existe $u$, $v$ tels que $au+bv=\mathrm{PGCD}(a;b)$.
Lemme de Gauss | Si $a$ divise $bc$ et si $a$ est premier avec $b$, alors $a$ divise $c$. | Indispensable pour résoudre $ax+by=c$.
Équation diophantienne $ax+by=c$ | Elle a des solutions entières si et seulement si $\mathrm{PGCD}(a;b)$ divise $c$. | Méthode : solution particulière, soustraction, Gauss.
Nombre premier | Entier $p\geq2$ qui n'a que deux diviseurs positifs : 1 et $p$. Il existe une infinité de nombres premiers. | Démonstration d'Euclide : $N=p_1p_2\cdots p_n+1$.
Test de primalité | Si $n\geq2$ n'est divisible par aucun nombre premier $p\leq\sqrt n$, alors $n$ est premier. | Crible d'Ératosthène.
Décomposition en facteurs premiers | Tout entier $n\geq2$ s'écrit de façon unique (à l'ordre près) comme produit de nombres premiers. | Théorème fondamental de l'arithmétique.
Petit théorème de Fermat | Si $p$ est premier et $a$ un entier non divisible par $p$ : $a^{p-1}\equiv1\ [p]$. Pour tout entier $a$ : $a^p\equiv a\ [p]$. | Sert à calculer des restes de grandes puissances.
Divisibilité par un produit | Si $a$ et $b$ divisent $n$ et sont premiers entre eux, alors $ab$ divise $n$. | Corollaire du lemme de Gauss.

# Matrices et graphes
> Maths expertes : calcul matriciel, suites de matrices, graphes.
Produit de matrices | Le coefficient $(i,j)$ de $AB$ est $\displaystyle\sum_kA_{ik}B_{kj}$ (ligne $i$ de $A$ par colonne $j$ de $B$). | Le produit n'est pas commutatif en général : $AB\neq BA$.
Matrice inverse | $A$ est inversible s'il existe $B$ avec $AB=BA=I$. Pour $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ : inversible $\Leftrightarrow ad-bc\neq0$, et $A^{-1}=\dfrac1{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$. | $ad-bc$ est le déterminant.
Système linéaire sous forme matricielle | Le système s'écrit $AX=B$ ; si $A$ est inversible, l'unique solution est $X=A^{-1}B$.
Suite de matrices $U_{n+1}=AU_n$ | Alors $U_n=A^nU_0$. | Pour $U_{n+1}=AU_n+B$ : chercher $C$ tel que $C=AC+B$, puis $U_n-C=A^n(U_0-C)$.
Puissances d'une matrice diagonalisable | Si $A=PDP^{-1}$ avec $D$ diagonale, alors $A^n=PD^nP^{-1}$, et $D^n$ s'obtient en élevant les coefficients diagonaux à la puissance $n$. | Méthode pour calculer $A^n$.
Nombre de chemins dans un graphe | Si $M$ est la matrice d'adjacence d'un graphe, le coefficient $(i,j)$ de $M^n$ est le nombre de chemins de longueur $n$ de $i$ à $j$.
Graphe probabiliste (chaîne de Markov) | Si $P$ est la matrice de transition et $\pi_n$ la loi à l'étape $n$ (ligne) : $\pi_{n+1}=\pi_nP$, donc $\pi_n=\pi_0P^n$. | Une loi stable vérifie $\pi=\pi P$.
Somme des degrés d'un graphe | Dans un graphe non orienté, la somme des degrés des sommets est égale au double du nombre d'arêtes. | Donc le nombre de sommets de degré impair est pair.
`);
