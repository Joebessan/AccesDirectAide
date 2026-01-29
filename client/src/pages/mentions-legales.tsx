import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Mentions légales</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2>1. Éditeur du site</h2>
              <p>
                Le site AccesDirectAide est édité par :<br />
                <strong>AccesDirectAide</strong><br />
                Siège social : Alsace, France<br />
                Email : contact@accesdirectaide.fr<br />
                Téléphone : 01 23 45 67 89
              </p>
            </section>

            <section>
              <h2>2. Directeur de la publication</h2>
              <p>
                Le directeur de la publication est le représentant légal de l'éditeur.
              </p>
            </section>

            <section>
              <h2>3. Hébergeur</h2>
              <p>
                Le site est hébergé par :<br />
                <strong>AccesDirectAide SAS</strong><br />
                Paris, France<br />
                Contact : hebergement@accesdirectaide.fr
              </p>
            </section>

            <section>
              <h2>4. Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus (textes, images, vidéos, logos, etc.) présents sur le site AccesDirectAide 
                sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation, 
                modification, publication, adaptation de tout ou partie des éléments du site est interdite, 
                sauf autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2>5. Données personnelles</h2>
              <p>
                Les informations recueillies sur ce site font l'objet d'un traitement informatique destiné 
                à la gestion des demandes d'aides et de rendez-vous. Conformément au RGPD, vous disposez 
                d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
              <p>
                Pour exercer ces droits, contactez-nous à : contact@accesdirectaide.fr
              </p>
            </section>

            <section>
              <h2>6. Cookies</h2>
              <p>
                Le site utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez paramétrer 
                votre navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site 
                pourraient ne plus être accessibles.
              </p>
            </section>

            <section>
              <h2>7. Liens externes</h2>
              <p>
                Le site peut contenir des liens vers des sites externes. AccesDirectAide n'est pas responsable 
                du contenu de ces sites tiers. Les liens vers les sources officielles sont fournis à titre 
                informatif et sont vérifiés régulièrement.
              </p>
            </section>

            <section>
              <h2>8. Mise à jour</h2>
              <p>
                Les présentes mentions légales peuvent être modifiées à tout moment. Nous vous invitons 
                à les consulter régulièrement.
              </p>
              <p className="text-muted-foreground">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
