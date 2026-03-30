<template>
  <section class="about-hero">
    <div class="ih-container">
      <h1>About Indy Hackers</h1>
      <p class="about-hero__sub">
        Indy Hackers strives to help tech people in Indiana grow by fostering community connections
        and celebrating individual successes.
      </p>
    </div>
  </section>

  <section class="board-section">
    <div class="ih-container">
      <h2 class="board-section__heading">Board Members</h2>
      <div class="board-members">
        <BoardMemberCard
          firstName="Chris"
          imageUrl="/images/board/chris.jpeg"
          lastName="Vannoy"
          linkedin="https://www.linkedin.com/in/cvannoy"
        />
        <BoardMemberCard
          firstName="Andrew"
          imageUrl="/images/board/andrew.jpeg"
          lastName="Poland"
          linkedin="https://www.linkedin.com/in/polandandrew"
        />
        <BoardMemberCard
          email="mailto:ben@indyhackers.org"
          firstName="Ben"
          imageUrl="/images/board/ben.jpg"
          lastName="Cochran"
          linkedin="https://www.linkedin.com/in/cochranb"
        />
        <BoardMemberCard
          firstName="Josh"
          imageUrl="/images/board/joshhurst.jpg"
          lastName="Hurst"
          linkedin="https://www.linkedin.com/in/josh-hurst42"
        />
        <BoardMemberCard
          email="mailto:katie@indyhackers.org"
          firstName="Katie"
          imageUrl="/images/board/katiehughes.jpg"
          lastName="Hughes"
          linkedin="https://www.linkedin.com/in/katiehughes"
        />
        <BoardMemberCard
          firstName="Michael"
          imageUrl="/images/board/michaelwelling.jpg"
          lastName="Welling"
          linkedin="https://www.linkedin.com/in/mewelling"
        />
        <BoardMemberCard
          firstName="Mike"
          imageUrl="/images/board/mikehockerman.png"
          lastName="Hockerman"
          linkedin="https://www.linkedin.com/in/mhoc"
        />
        <BoardMemberCard
          email="mailto:nicole@indyhackers.org"
          firstName="Nicole"
          imageUrl="/images/board/nichole.jpeg"
          lastName="Dobias"
          linkedin="https://www.linkedin.com/in/nicole-dobias"
        />
        <BoardMemberCard
          firstName="Stanton"
          imageUrl="/images/board/stantonsievers.jpeg"
          lastName="Sievers"
          linkedin="https://www.linkedin.com/in/stantonsievers"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BoardMemberCard from '../components/about/BoardMemberCard.vue'
</script>

<style scoped>
.about-hero {
  padding: 2rem 0 3rem;
}

.about-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.about-hero__sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  color: rgba(18, 18, 18, 0.7);
  line-height: 1.6;
  max-width: 40rem;
}

.board-section {
  padding: 2rem 0 5rem;
}

.board-section__heading {
  margin-bottom: 2rem;
}

.board-members {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .about-hero {
    padding: 5rem 0 2rem;
  }

  .board-members {
    grid-template-columns: 1fr;
  }
}
</style>
